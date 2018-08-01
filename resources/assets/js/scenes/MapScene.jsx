import 'dragscroll'
import React, {Component} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Copyright from '../components/Copyright'
import Map from '../components/Map'
import Marker from '../components/Marker'
import Modal from '../components/Modal'
import ImageGallery from 'react-image-gallery'
import Spinner from '../components/Spinner'
import Disclaimer from '../components/Disclaimer'
import MarkersFilter from '../helpers/MarkersFilter'
import Labels from '../helpers/Labels'
import AdvancedFiltersModal from '../components/AdvancedFiltersModal'
import {Link} from 'react-router-dom'
import Notify from '../components/Notify'
import CollectionForm from '../components/CollectionForm'
import FlagForm from '../components/FlagForm'
import Utils from '../helpers/Utils'
import User from '../helpers/User'
import Path from '../helpers/Path'
import Scene from './Scene'

export default class App extends Scene {
  constructor(props) {
    super(props)

    this.initPosition()


    this.initialLoad = true

    this.state = {
      markers              : [],
      categories           : [],
      selectedCategories   : [],
      selectedConfirmation : 0,
      center               : this.defaultMapPosition.center,
      zoom                 : this.defaultMapPosition.zoom,
      selectedMarker       : null,
      galleryImages        : [],
      showSidebar          : false,
      loading              : false,
      showFilters          : false,
      searchTerm           : '',
      collections          : [],
      selectedCollection   : 0,
      filters              : [],
      selectedFilter       : 0,
      showFiltersModal     : false,
      total                : 0,
      showCollectionsForm  : false,
      showFlagForm         : false,
      ownedCollections     : [],
      appliedAdvancedFilter: false
    }

    document.title = 'Map - TreeSnap'
  }

  /**
   * Set the maps and load observations into the state.
   */
  componentWillMount() {
    this.loadCategories()
    this.loadCollections()
    this.loadFilters()
    this.loadCount()
    document.body.className = 'map-page'
  }

  /**
   * Set loading state and inititate the sidebar
   */
  componentDidMount() {
    this.setState({loading: true})
    this.initSidebar()
  }

  /**
   *
   */
  initPosition() {
    this.defaultMapPosition = {
      center: {
        lat: 40.354388,
        lng: -95.998237
      },
      zoom  : 5
    }

    try {
      let parsed = Path.parseUrl(this.props.location.search)

      if (typeof parsed.zoom !== 'undefined') {
        let zoom = parseInt(parsed.zoom)
        if (!isNaN(zoom) && zoom > 1 && zoom < 16) {
          this.defaultMapPosition.zoom = zoom
        }
      }

      if (typeof parsed.center !== 'undefined') {
        let center = parsed.center.split(',')
        if (center.length === 2) {
          let lat = parseFloat(center[0])
          let lng = parseFloat(center[1])
          if (!isNaN(lat) && !isNaN(lng)) {
            this.defaultMapPosition.center = {lat, lng}
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Revert body classes
   */
  componentWillUnmount() {
    document.body.className = ''
  }

  /**
   *
   */
  loadCount() {
    axios.get('/web/map/count').then(response => {
      this.setState({
        total: response.data.data.count
      })
    }).catch(error => {
      console.log(error.response)
    })
  }

  /**
   * Open the sidebar automatically and display the filters if the window
   * is big enough (bigger than 797px which is the popular tablet width)
   */
  initSidebar() {
    if (window.outerWidth > 797) {
      this.setState({
        showSidebar: true,
        showFilters: true
      })
      this.refs.maps.resize()
    }
  }

  /**
   * Open the sidebar and reset the map size.
   */
  openSidebar() {
    this.setState({
      showSidebar: true
    })
    this.refs.maps.resize()
  }

  /**
   * Close the sidebar and reset the map size.
   */
  closeSidebar() {
    this.setState({
      showSidebar        : false,
      showCollectionsForm: false,
      showFlagForm       : false
    })
    this.refs.maps.resize()
  }

  updateHistory(center, zoom) {
    let lat, lng
    if(typeof center.lat === 'function') {
      lat = center.lat()
    } else {
      lat = center.lat
    }

    if(typeof center.lng === 'function') {
      lng = center.lng()
    } else {
      lng = center.lng
    }

    this.props.history.replace(`/map/?center=${lat},${lng}&zoom=${zoom}`)
  }

  /**
   * Gets observations from the API and parses them into markers.
   */
  loadObservations() {
    let bounds = this.refs.maps.getBounds()

    axios.get('/web/map', {
      params: {
        bounds: {
          southWest: bounds.getSouthWest().toJSON(),
          northEast: bounds.getNorthEast().toJSON()
        }
      }
    }).then(response => {
      this.initialLoad = false

      // Setup the observations to be rendered into markers
      let markers = response.data.data

      // Add the markers to the state
      if (!User.admin() && !User.scientist()) {
        this.disclaimer.show()
      }

      let filtered
      if (!this.filter) {
        this.filter = new MarkersFilter(markers, this.state.selectedCategories)
        filtered    = this.filter._filter()
      } else {
        this.filter.resetBounds()
        filtered = this.filter.replace(markers)
      }

      this.setState({markers: filtered, loading: false})
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  /**
   * Get available categories from the server.
   */
  loadCategories() {
    axios.get('/web/observations/categories').then(response => {
      let categories = response.data.data
      this.setState({
        categories        : categories,
        selectedCategories: categories
      })

      if (this.filter) {
        this.filter.setCategories(categories)
      }
    }).catch(error => {
      console.log(error.response)
    })
  }

  /**
   * Get available collections from the server.
   * Logged in users only.
   */
  loadCollections() {
    if (!User.authenticated()) {
      return
    }

    axios.get('/web/collections/1').then(response => {
      this.setState({collections: response.data.data})
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        // Ignore unauthenticated error
        return
      }

      console.log(error.response)
    })

    axios.get('/web/collections/customizable/1').then(response => {
      this.setState({ownedCollections: response.data.data})
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        // Ignore unauthenticated error
        return
      }

      console.log(error.response)
    })
  }

  /**
   * Get available filters from the server.
   * Logged in users only.
   */
  loadFilters() {
    if (!User.authenticated()) {
      return
    }

    axios.get('/web/filters').then(response => {
      let filters = response.data.data.map(filter => {
        return {
          label: filter.name,
          value: filter.id
        }
      })

      this.setState({filters})
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        // Ignore unauthenticated error
        return
      }

      console.log(error.response)
    })
  }

  /**
   * Zoom to marker.
   *
   * @param marker
   * @param zoom
   */
  goToSubmission(marker, zoom) {
    if (typeof zoom === 'undefined') {
      zoom = 15
    }

    const center = {
      lat: marker.position.latitude,
      lng: marker.position.longitude
    }

    this.refs.maps.goTo(new google.maps.LatLng(center), zoom)

    this.updateHistory(center, zoom)
  }

  /**
   * Render individual submission.
   *
   * @param marker
   * @returns {XML}
   */
  _renderSubmission(marker) {
    let title = marker.title
    if (title.length > 30) {
      title = title.substr(0, 30) + '...'
    }
    return (
      <a href="javascript:;"
         role="button"
         className="bar-item"
         style={{backgroundImage: `url(${marker.thumbnail})`}}
         key={`marker_${marker.id}`}
         onClick={() => {
           this.setState({
             selectedMarker: marker,
             showFilters   : false
           })
           this.openSidebar()
           let zoom = this.refs.maps.getZoom()
           this.goToSubmission(marker, zoom > 10 ? zoom : 13)
           if (marker.ref !== null) {
             marker.ref.openCallout()
           }
         }}>
        <div className="bar-item-field">
          <strong style={{color: '#fff'}}>{title}</strong>
          <p style={{color: '#eee', fontWeight: '500', fontSize: '14px'}}>
            {marker.owner}
          </p>
          <p style={{color: '#eee', fontWeight: '500', fontSize: '14px'}}>
            {marker.date}
          </p>
        </div>
      </a>
    )
  }

  /**
   * Reset the position to the center and zoom out.
   */
  resetMapPosition() {
    this.refs.maps.goTo(this.defaultMapPosition.center, this.defaultMapPosition.zoom)
  }

  /**
   * Allow users to filter submissions by plant.
   *
   * @param name
   */
  changeCategory(name) {
    let selectedCategories = this.state.categories
    if (name !== 'all') {
      selectedCategories = [name]
    }

    let markers = this.filter.category(selectedCategories)
    this.setState({markers, selectedCategories})
  }

  /**
   * Allows users to filter by collection.
   *
   * @param selectedCollection
   */
  changeCollection(selectedCollection) {
    let markers = this.filter.collections(selectedCollection)
    this.setState({markers, selectedCollection})
  }

  /**
   * Allows users to view only confirmed observations.
   *
   * @param selectedConfirmation
   */
  changeConfirmation(selectedConfirmation) {
    selectedConfirmation = parseInt(selectedConfirmation)
    let markers          = this.filter.confirmed(selectedConfirmation)

    this.setState({markers, selectedConfirmation})
  }

  /**
   * Allows users to reapply a saved advanced filter.
   *
   * @param selectedFilter
   */
  changeFilter(selectedFilter) {
    selectedFilter = parseInt(selectedFilter)
    this.setState({selectedFilter})
    if (selectedFilter !== 0) {
      this.applyAdvancedFilter(selectedFilter)
    } else {
      this.loadObservations()
      Notify.push('Advanced filters removed.')
    }
  }

  /**
   * Request filtered observations from server.
   *
   * @param selectedFilter
   */
  applyAdvancedFilter(selectedFilter) {
    this.setState({loading: true})
    axios.get(`/web/filter/${selectedFilter}`, {
      params: {
        map: 1
      }
    }).then(response => {
      let {observations, filter} = response.data.data
      let markers                = this.filter.replace(observations)
      this.setState({
        markers,
        loading: false,
        total  : observations.length
      })
      if (filter) {
        Notify.push(`Filter "${filter.name}" has been applied.`)
      }
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  /**
   * Deal with newly created advanced filters.
   *
   * @param response
   */
  filterCreated(response) {
    let data = response.data
    if (data.filter) {
      let filters        = this.state.filters.concat({
        label: data.filter.name,
        value: data.filter.id
      })
      let selectedFilter = data.filter.id

      this.setState({
        filters,
        selectedFilter
      })

      Notify.push(`Filter "${data.filter.name}" has been created and applied.`)
    } else {
      this.setState({selectedFilter: 0})
      Notify.push('Advanced filters applied.')
    }

    let markers = this.filter.replace(data.observations)
    this.setState({markers, showFiltersModal: false, appliedAdvancedFilter: true})
  }

  /**
   * search by plant name or username.
   *
   * @param searchTerm
   */
  search(searchTerm) {
    let markers = this.filter.search(searchTerm)
    this.setState({markers, searchTerm})
  }

  /**
   * Handle map bounds changes.
   *
   * @param newBounds
   */
  boundsChanged(newBounds) {
    let center = this.refs.maps.getCenter()
    let zoom   = this.refs.maps.getZoom()

    this.updateHistory(center, zoom)

    // Determine if the initial loader completed then respond to bounds change
    // If the initial loader is done, this.initialLoad is set to FALSE
    if (!this.initialLoad) {
      // Determine if there is an applied advanced filter
      if (parseInt(this.state.selectedFilter) === 0 && !this.state.appliedAdvancedFilter) {
        // No filters applied, so load observations with new bounds
        this.loadObservations()
        return
      }
    }

    if (this.filter) {
      let markers = this.filter.bounds(newBounds)
      this.setState({markers})
    }
  }

  /**
   * Render the map.
   *
   * @returns {XML}
   * @private
   */
  _renderMap() {
    return (
      <Map id="map2"
           ref="maps"
           center={this.state.center}
           zoom={this.state.zoom}
           onBoundsChange={this.boundsChanged.bind(this)}
           onLoad={this.loadObservations.bind(this)}
      >
        {this.state.markers.map(marker => {
          return (
            <Marker key={marker.id}
                    position={marker.position}
                    title={marker.title}
                    ref={(ref) => marker.ref = ref}
                    owner_id={marker.user_id}
                    onClick={() => {
                      this.setState({
                        selectedMarker     : marker,
                        showFilters        : false,
                        showCollectionsForm: false,
                        showFlagForm       : false
                      })

                      if (window.innerWidth > 797) {
                        this.openSidebar()
                      }
                    }}
            >
              <div className="media callout is-flex flex-v-center">
                <div className="media-left mr-0">
                  <img src={marker.thumbnail}
                       alt={marker.title}
                       style={{
                         width : 50,
                         height: 'auto'
                       }}/>
                </div>
                <div className="media-content">
                  <div className="mb-0"><strong>{marker.title}</strong></div>
                  <div className="mb-0">By {marker.owner}</div>
                  <a href={`/observation/${marker.id}`}>See full description</a>
                </div>
              </div>
            </Marker>
          )
        })}
      </Map>
    )
  }

  /**
   * Render bottom horizontal bar.
   *
   * @returns {XML}
   * @private
   */
  _renderBottomBar() {
    return (
      <div className="horizontal-bar" id="horizontal-bar-container">
        <a href="javascript:;" className="scroll scroll-left" onClick={this.scrollLeft.bind(this)}>
          <i className="fa fa-chevron-left"></i>
        </a>
        <div className="bar-items-container dragscroll"
             id="horizontal-bar"
             style={{overflowX: this.state.markers.length === 0 ? 'hidden' : 'scroll'}}
             onScroll={this.setScrollState.bind(this)}>
          {this.state.markers.slice(0, 20).map((marker, index) => {
            return this._renderSubmission(marker, index)
          })}
          {this.state.markers.length === 0 ?
            <p className="ml-1 mt-1 has-text-white">No results found. Try zooming out or moving the map to cover the locations you are interested in.</p>
            : null}
        </div>
        <a href="javascript:;" className="scroll scroll-right" onClick={this.scrollRight.bind(this)}>
          <i className="fa fa-chevron-right"></i>
        </a>
      </div>
    )
  }

  /**
   * Set the scroll bar position for the horizontal bar.
   */
  setScrollState() {
    let bar            = document.getElementById('horizontal-bar')
    let container      = document.getElementById('horizontal-bar-container')
    let width          = bar.offsetWidth
    let scrollPosition = bar.scrollLeft

    if (width + scrollPosition === bar.scrollWidth) {
      container.style.paddingRight = '65px'
      bar.scrollLeft += 65
    } else {
      container.style.paddingRight = 0
    }
  }

  /**
   * Scroll the horizontal bar to the right
   */
  scrollRight() {
    let scrolled = 0
    let interval
    let scroll   = () => {
      if (scrolled === 200) {
        clearInterval(interval)
      }
      scrolled += 5
      document.getElementById('horizontal-bar').scrollLeft += 5
    }

    interval = setInterval(scroll, 5)
  }

  /**
   * Scroll the horizontal bar to the left
   */
  scrollLeft() {
    let scrolled = 0
    let interval
    let scroll   = () => {
      if (scrolled === 200) {
        clearInterval(interval)
      }
      scrolled += 5
      document.getElementById('horizontal-bar').scrollLeft -= 5
    }

    interval = setInterval(scroll, 5)
  }

  /**
   * Render sidebar filters.
   *
   * @returns {XML}
   * @private
   */
  _renderFilters() {
    return (
      <div className="sidebar-filters">
        <p className="mb-0" style={{marginTop: -10}}>
          Showing {this.state.markers.length} out of {this.state.total}
        </p>
        <div className="field">
          <label className="label">Filters</label>
          <p className="control has-icon has-icon-right">
            <input className="input"
                   type="search"
                   placeholder="Search visible area on map"
                   value={this.state.searchTerm}
                   onChange={({target}) => this.search(target.value)}/>
            <span className="icon is-small">
              <i className="fa fa-search"></i>
            </span>
          </p>
          <p className="help">
            Search by user name or observation title.
          </p>
        </div>

        <div className="field">
          <label className="label">Observation Category</label>
          <div className="control">
            <span className="select is-full-width">
              <select onChange={({target}) => {
                this.changeCategory(target.value)
              }} value={this.state.selectedCategories.length === 1 ? this.state.selectedCategories[0] : 'all'}>
                <option value={'all'}>All Categories</option>
                {this.state.categories.map((category, index) => {
                  return <option value={category} key={index}>{category}</option>
                })}
              </select>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Collections</label>
          <div className="control">
            <span className="select is-full-width">
              <select value={this.state.selectedCollection}
                      name="collections"
                      onChange={({target}) => this.changeCollection(target.value)}>
                <option value={0}>Select Collection</option>
                {this.state.collections.map(collection => {
                  return (
                    <option value={parseInt(collection.value)}
                            key={collection.value}>
                      {collection.label}
                    </option>
                  )
                })}
              </select>
            </span>
            {this.state.filters.length === 0 ?
              <p className='help is-warning'>You currently have no saved collections</p>
              : null}
            <p className="help">
              You can create or add observations to a collection using the
              <span className="ml-0 mr-0 icon is-small"><i className="fa fa-star"></i></span> icon.
            </p>
          </div>
        </div>

        <div className="field">
          <label className="label">Saved Advanced Filters</label>
          <div className="control">
            <span className="select is-full-width">
              <select value={this.state.selectedFilter}
                      onChange={({target}) => this.changeFilter(target.value)}>
                <option value={0}>Select Saved Filter</option>
                {this.state.filters.map(filter => {
                  return (
                    <option value={parseInt(filter.value)}
                            key={filter.value}>
                      {filter.label}
                    </option>
                  )
                })}
              </select>
            </span>
            {this.state.filters.length === 0 ?
              <p className='help is-warning'>You currently have no saved filters</p>
              : null}
            <p className="help">
              You can save advanced filters by providing a label before applying the filters.
            </p>
          </div>
        </div>

        <div className="field">
          <label className="label">Confirmed by Scientists</label>
          <div className="control">
            <span className="select is-full-width">
              <select value={this.state.selectedConfirmation}
                      onChange={({target}) => this.changeConfirmation(target.value)}>
                <option value={0}>Show All</option>
                <option value={1}>Show only confirmed observations</option>
              </select>
            </span>
            <p className="help">
              Allows you to view only confirmed observations.
            </p>
          </div>
        </div>

        <p className="mt-1 has-text-centered">
          {this.state.appliedAdvancedFilter || this.state.selectedFilter !== 0 ?
            <a href="javascript:;"
               className="button is-danger"
               onClick={() => {
                 this.setState({appliedAdvancedFilter: false, loading: true, selectedFilter: 0})
                 this.loadObservations()
               }}>
              Clear Advanced Filters
            </a>
            :
            <a href="javascript:;"
               className="button is-primary"
               onClick={() => this.setState({showFiltersModal: true})}>
              More Advanced Filters
            </a>
          }
        </p>
      </div>
    )
  }

  /**
   * Render the sidebar.
   *
   * @returns {XML}
   * @private
   */
  _renderSidebar() {
    let marker = this.state.selectedMarker
    if (marker === null && this.state.showFilters === false) {
      return (<Sidebar/>)
    }

    return (
      <Sidebar onCloseRequest={() => {
        if (this.state.showCollectionsForm || this.state.showFlagForm) {
          this.setState({
            showCollectionsForm: false,
            showFlagForm       : false
          })
        } else {
          this.closeSidebar()
        }
      }}>
        {this.getSidebarContent()}

        {this.state.showCollectionsForm || this.state.showFlagForm ?
          <div className="sidebar-bottom-bar">
            <a href="javascript:;" onClick={() => {
              this.setState({
                showCollectionsForm: false,
                showFlagForm       : false
              })
            }}>
              <span className="icon is-small">
                <i className="fa fa-arrow-left"></i>
              </span>
              <span>Return to Observation</span>
            </a>
          </div>
          : null}
      </Sidebar>
    )
  }

  /**
   * Get the correct sidebar content.
   *
   * @returns {*}
   */
  getSidebarContent() {
    if (this.state.showFilters) {
      return this._renderFilters()
    }

    if (this.state.selectedMarker !== null) {
      if (this.state.showCollectionsForm) {
        return this._renderCollectionsForm()
      }

      if (this.state.showFlagForm) {
        return this._renderFlagForm()
      }
      return this._renderObservation()
    }

    return null
  }

  /**
   * Set the state to show the collections form for the
   * currently selected observation.
   */
  showCollectionsForm() {
    this.setState({
      showFilters        : false,
      showFlagForm       : false,
      showCollectionsForm: true
    })
  }

  /**
   * Set the state to show the flag form for the
   * currently selected observation.
   */
  showFlagForm() {
    this.setState({
      showFilters        : false,
      showFlagForm       : true,
      showCollectionsForm: false
    })
  }

  /**
   * Render add to collection form.
   *
   * @returns {XML}
   * @private
   */
  _renderCollectionsForm() {
    return (
      <div className="p-1">
        <h4 className="title is-4 mb-1"
            style={{maxWidth: '225px'}}>Add {this.state.selectedMarker.title} to a collection</h4>
        <CollectionForm
          observationId={this.state.selectedMarker.id}
          collections={this.state.ownedCollections}
          onSubmit={(collection) => {
            Notify.push(`Observation added to "${collection.label}" successfully`)
            this.setState({})

            // Update all collections if a new one has been created.
            let collections = this.state.collections
            for (let i = 0; i < collections.length; i++) {
              if (collections[i].value === collection.id) {
                return
              }
            }

            collections.push({
              label: collection.label,
              value: collection.id
            })

            this.setState({
              collections,
              ownedCollections: this.state.ownedCollections.concat({
                label: collection.label,
                value: collection.id
              }),
              selectedMarker  : this.filter.newCollection(this.state.selectedMarker, collection)
            })
          }}
        />

        {this.state.selectedMarker.collections.length > 0 ?
          <div className="field mt-1">
            <label className="label">This observation is in the following collections</label>
          </div>
          : null}

        {this.state.selectedMarker.collections.map(collection => {
          return (
            <div key={collection.id} className="flexbox flex-space-between flex-v-center mt-1">
              <div>{collection.label}</div>
              <div>
                <button className="button is-small is-outlined is-danger"
                        type="button"
                        onClick={() => this.removeCollection(this.state.selectedMarker, collection)}>
                  <span className="icon is-small">
                    <i className="fa fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  /**
   * Remove collection to marker relationship.
   *
   * @param marker
   * @param collection
   */
  removeCollection(marker, collection) {
    axios.delete('/web/collection/detach', {
      params: {
        observation_id: marker.id,
        collection_id : collection.id
      }
    }).then(response => {
      this.setState({selectedMarker: this.filter.removeCollection(marker, parseInt(collection.id))})
      Notify.push('Observation removed from collection successfully')
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Render flag observation form.
   *
   * @returns {XML}
   * @private
   */
  _renderFlagForm() {
    let flagged = this.state.selectedMarker.flags.length > 0
    return (
      <div className="p-1">
        <h4 className="title is-4 mb-1"
            style={{maxWidth: '225px'}}>Flag {this.state.selectedMarker.title}</h4>
        <FlagForm
          observationId={this.state.selectedMarker.id}
          collections={this.state.collections}
          flagged={flagged}
          flagId={flagged ? this.state.selectedMarker.flags[0].id : 0}
          onSubmit={(flag) => {
            Notify.push('Observation has been flagged')
            this.setState({selectedMarker: this.filter.newFlag(this.state.selectedMarker, flag)})
          }}
          onUndo={flag => {
            Notify.push('Flag removed successfully')
            this.setState({selectedMarker: this.filter.removeFlag(this.state.selectedMarker, parseInt(flag.id))})
          }}
        />

        {flagged ?
          <button className="button is-link"
                  style={{float: 'right', position: 'relative', top: -35}}
                  onClick={() => this.setState({showFlagForm: false})}>Done</button>
          : null}
      </div>
    )
  }

  /**
   * Observation sidebar view.
   *
   * @returns {XML}
   * @private
   */
  _renderObservation() {
    let marker = this.state.selectedMarker
    let data   = marker.data
    return (
      <div>
        <div className="sidebar-img"
             style={{backgroundImage: `url(${marker.thumbnail})`}}>
          <a href="javascript:;"
             className="sidebar-img-overlay flexbox flex-v-center flex-h-center flex-column"
             onClick={() => {
               this.setState({galleryImages: marker.images, showModal: true})
             }}>
            <i className="fa fa-photo"></i>
            <div className="has-text-centered">
              Click to Enlarge
            </div>
          </a>
        </div>
        <div className="sidebar-icons-container">
          <div className="card-footer">
            <a href="javascript:;"
               className="flex-column"
               onClick={() => {
                 this.setState({galleryImages: marker.images, showModal: true})
               }}>
              <i className="fa fa-picture-o"></i>
              <span className="help">Images</span>
            </a>
            <a href="javascript:;"
               className={`flex-column${marker.collections.length > 0 ? ' is-success' : ''}`}
               onClick={this.showCollectionsForm.bind(this)}>
              <i className="fa fa-star"></i>
              <span className="help">Save</span>
            </a>
            <a href="javascript:;"
               className={`flex-column${marker.flags.length > 0 ? ' is-danger' : ''}`}
               onClick={this.showFlagForm.bind(this)}>
              <i className="fa fa-flag"></i>
              <span className="help">Flag</span>
            </a>
          </div>
        </div>
        <div className="sidebar-content">
          <h3 className="title is-4">
            {marker.title}
          </h3>

          {marker.custom_id ?
            <div className="sidebar-item">
              <h5><strong>Custom Tree Identifier</strong></h5>
              <p className="ml-1">{marker.custom_id}</p>
            </div>
            : null}

          {marker.mobile_id ?
            <div className="sidebar-item">
              <h5><strong>ID</strong></h5>
              <p className="ml-1">{marker.mobile_id}</p>
            </div>
            : null}

          <div className="sidebar-item">
            <h5><strong>Collection Date</strong></h5>
            <p className="ml-1">{marker.date}</p>
          </div>

          {Object.keys(data).map(key => {
            if (key.indexOf('_values') > -1 || key.indexOf('_units') > -1 || key.indexOf('_confidence') > -1) {
              return null
            }
            let unit = null
            if (typeof data[`${key}_units`] !== 'undefined') {
              unit = data[`${key}_units`]
            }
            const label = typeof Labels[key] !== 'undefined' ? Labels[key] : key
            return this._renderMetaData(label, data[key], key, marker, unit)
          })}

          <div className="sidebar-item">
            <h5><strong>Observation Page</strong></h5>
            <p className="ml-1"><Link to={`/observation/${marker.id}`}>Visit Observation Page</Link></p>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Decode meta data.
   *
   * @param {string} label
   * @param {string|object} data
   * @param {string} key
   * @param {object} marker
   * @param {string} unit
   * @return {*}
   * @private
   */
  _renderMetaData(label, data, key, marker, unit) {
    if (Utils.isJson(data) === true) {
      data = JSON.parse(data)
    }

    if (typeof data === 'object') {
      return null
    }

    return (
      <div className="sidebar-item" key={key}>
        <h5><strong>{label}</strong></h5>
        <div className="ml-1">
          {data} {unit}{key === 'comment' && marker.has_private_comments ?
          <p className="help">
            <span className="icon is-small">
              <i className="fa fa-lock"></i>
            </span>
            <span>Only you can see this comment</span>
          </p>
          : null}
        </div>
      </div>
    )
  }

  /**
   * Render the filter bar and expand button.
   *
   * @returns {XML}
   * @private
   */
  _renderFilterButton() {
    return (
      <a href="javascript:;"
         className="button filters-button"
         onClick={() => {
           this.setState({
             selectedMarker: null,
             showFilters   : !this.state.showFilters
           })

           if (this.state.showFilters) {
             this.closeSidebar()
           } else {
             this.openSidebar()
           }
         }}>
        <span className="icon">
          <i className="fa fa-filter"></i>
        </span>
        <span>Filters</span>
      </a>
    )
  }

  /**
   * Render a gallery image
   * @param item
   * @returns {XML}
   * @private
   */
  _renderImage(item) {
    return (
      <div className={`image-gallery-image${this.state.galleryImages.length > 1 ? ' show-scroll' : ''}`}>
        <img src={item.original}
             alt="Plant Image"/>
      </div>
    )
  }

  /**
   * Render the modal that contains the gallery.
   *
   * @returns {XML}
   * @private
   */
  _renderImagesModal() {
    if (!this.state.showModal) {
      return null
    }

    if (this.state.galleryImages.length === 0) {
      return (
        <Modal large={true} onCloseRequest={() => this.setState({showModal: false})}/>
      )
    }

    let images = []

    this.state.galleryImages.map(image => {
      images.push({
        original: image
      })
    })

    return (
      <Modal onCloseRequest={() => this.setState({showModal: false})}>
        <ImageGallery
          items={images}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          renderItem={this._renderImage.bind(this)}
        />
      </Modal>
    )
  }

  /**
   * Render the scene.
   *
   * @returns {XML}
   */
  render() {
    return (
      <div className={this.state.showSidebar ? 'sidebar-visible' : ''}>
        <Navbar container={true}/>

        {this._renderSidebar()}
        {this._renderMap()}
        {this._renderFilterButton()}
        {this._renderBottomBar()}
        {this._renderImagesModal()}

        <Disclaimer ref={(ref) => this.disclaimer = ref}>
          Notice: For privacy reasons, the location of the trees displayed on this map have been altered.
          To learn more, visit our <a href="/faq">Frequently Asked Questions</a> page.
        </Disclaimer>

        <Copyright/>

        <Spinner visible={this.state.loading} containerStyle={{backgroundColor: 'rgba(255,255,255,0.8)'}}/>

        <AdvancedFiltersModal
          visible={this.state.showFiltersModal}
          onCloseRequest={() => this.setState({showFiltersModal: false})}
          onCreate={this.filterCreated.bind(this)}
          map={true}/>
      </div>
    )
  }
}
