/**
 * TreeSnap Map
 */
// Bootstrap Everything (loads dash and a configured axios)
import 'dragscroll'
import React, {Component} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Copyright from '../components/Copyright'
import Map from '../UI/Map'
import Marker from '../UI/Marker'
import Modal from '../UI/Modal'
import ImageGallery from 'react-image-gallery'
import Spinner from '../components/Spinner'
import Disclaimer from '../components/Disclaimer'
import MarkersFilter from '../helpers/MarkersFilter'
import Labels from '../helpers/Labels'
import AdvancedFiltersModal from '../components/AdvancedFiltersModal'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.defaultMapPosition = {
            center: {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom  : 5
        }

        this.state = {
            markers           : [],
            categories        : [],
            selectedCategories: [],
            center            : this.defaultMapPosition.center,
            zoom              : this.defaultMapPosition.zoom,
            selectedMarker    : null,
            galleryImages     : [],
            showSidebar       : false,
            loading           : false,
            showFilters       : false,
            searchTerm        : '',
            collections       : [],
            selectedCollection: 0,
            filters           : [],
            selectedFilter    : 0,
            showFiltersModal  : false
        }
    }

    /**
     * Set the maps and load observations into the state.
     */
    componentWillMount() {
        this.loadObservations()
        this.loadCategories()
        this.loadCollections()
        this.loadFilters()
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
        this.setState({showSidebar: false})
        this.refs.maps.resize()
    }

    /**
     * Gets observations from the API and parses them into markers.
     */
    loadObservations() {
        this.setState({loading: true})

        axios.get('/api/map').then(response => {
            // Setup the observations to be rendered into markers
            let markers = response.data.data

            // Add the markers to the state

            if (!window.Laravel.isAdmin) {
                this.disclaimer.show()
            }

            if (!this.filter) {
                this.filter = new MarkersFilter(markers, this.state.selectedCategories)
            } else {
                this.filter.replace(markers)
            }

            let filtered = this.filter.bounds(this.refs.maps.getBounds())
            this.setState({markers: filtered})
            this.initSidebar()
        }).catch(error => {
            console.log(error)
        }).then(() => {
            this.setState({loading: false})
        })
    }

    /**
     * Get available categories from the server.
     */
    loadCategories() {
        axios.get('/observations/categories').then(response => {
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
     */
    loadCollections() {
        axios.get('/collections/1').then(response => {
            this.setState({collections: response.data.data})
        }).catch(error => {
            console.log(error.response)
        })
    }

    /**
     * Get available filters from the server.
     */
    loadFilters() {
        axios.get('/api/filters').then(response => {
            let filters = response.data.data.map(filter => {
                return {
                    label: filter.name,
                    value: filter.id
                }
            })

            this.setState({filters})
        }).catch(error => {
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
            zoom = 24
        }

        this.refs.maps.goTo({
            lat: marker.position.latitude,
            lng: marker.position.longitude
        }, zoom)
    }

    /**
     * Render individual submission.
     *
     * @param marker
     * @param index
     * @returns {XML}
     */
    _renderSubmission(marker, index) {
        let image = marker.images.length > 0 ? marker.images[0] : '/images/placeholder.png'
        return (
            <a
                href="javascript:;"
                role="button"
                className="bar-item"
                style={{backgroundImage: `url(${image})`}}
                key={index}
                onClick={() => {
                    this.setState({
                        selectedMarker: marker,
                        showFilters   : false
                    })
                    this.openSidebar()
                    this.goToSubmission.call(this, marker, 18)
                    if (marker.ref !== null) {
                        marker.ref.openCallout()
                    }
                }}
            >
                <div className="bar-item-field">
                    <strong style={{color: '#fff'}}>{marker.title}</strong>
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
        let selectedCategories = this.state.selectedCategories

        if (selectedCategories.indexOf(name) !== -1) {
            selectedCategories = selectedCategories.filter(c => name !== c)
        } else {
            selectedCategories.push(name)
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
        }
    }

    /**
     * Request filtered observations from server.
     *
     * @param selectedFilter
     */
    applyAdvancedFilter(selectedFilter) {
        this.setState({loading: true})
        axios.get(`/api/filter/${selectedFilter}`, {
            params: {
                map: 1
            }
        }).then(response => {
            let markers = this.filter.replace(response.data.data.observations)
            this.setState({
                markers,
                loading: false
            })
        }).catch(error => {
            this.setState({loading: false})
            console.log(error)
        })
    }

    filterCreated(filter) {
        if (filter.filter) {
            let filters        = this.state.filters.concat({
                label: filter.filter.name,
                value: filter.filter.id
            })
            let selectedFilter = filter.filter.id

            this.setState({
                filters,
                selectedFilter
            })
        }

        let markers = this.filter.replace(filter.observations)
        this.setState({markers, showFiltersModal: false})
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
            >
                {this.state.markers.map(marker => {
                    return (
                        <Marker key={marker.id}
                                position={marker.position}
                                title={marker.title}
                                ref={(ref) => marker.ref = ref}
                                onClick={() => {
                                    this.setState({
                                        selectedMarker: marker,
                                        showFilters   : false
                                    })
                                    this.openSidebar()
                                }}
                        >
                            <div className="media callout">
                                <div className="media-left mr-0">
                                    <img src={marker.images.length > 0 ? marker.images[0] : '/images/placeholder.png'}
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

    _renderBottomBar() {
        return (
            <div className={`horizontal-bar${this.state.markers.length === 0 ? ' hide-scroll-bar' : ''}`}
                 id="horizontal-bar-container">
                <a href="javascript:;" className="scroll scroll-left" onClick={this.scrollLeft.bind(this)}>
                    <i className="fa fa-chevron-left"></i>
                </a>
                <div className="bar-items-container dragscroll"
                     id="horizontal-bar"
                     onScroll={this.setScrollState.bind(this)}>
                    {this.state.markers.slice(0, 40).map((marker, index) => {
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
        interval     = setInterval(scroll, 5)
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
        interval     = setInterval(scroll, 5)
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
                    <b>Found {this.state.markers.length} Observations</b>
                </p>
                <div className="field">
                    <label className="label">Filters</label>
                    <p className="control has-icon has-icon-right">
                        <input className="input"
                               type="search"
                               placeholder="Search"
                               value={this.state.searchTerm}
                               onChange={({target}) => this.search(target.value)}/>
                        <span className="icon is-small">
                            <i className="fa fa-search"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <div className="control">
                        <div className="checkbox-container">
                            {this.state.categories.map((category, index) => {
                                return (
                                    <a key={index}
                                       href="javascript:;"
                                       className={`button is-full checkbox-button${this.state.selectedCategories.indexOf(category) !== -1 ? ' is-active' : ''}`}
                                       onClick={() => {
                                           this.changeCategory(category)
                                       }}>
                                        <span className="icon mr-0">
                                            <i className="fa fa-check"></i>
                                        </span>
                                        <span>{category}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {this.state.collections.length > 0 ?
                    <div className="field">
                        <label className="label">Collections</label>
                        <div className="control">
                            <span className="select is-full-width">
                                <select value={this.state.selectedCollection}
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
                            <p className="help">
                                You can create or add observations to a collection using the
                                <span className="ml-0 mr-0 icon is-small"><i className="fa fa-star"></i></span> icon.
                            </p>
                        </div>
                    </div>
                    : null}

                {this.state.filters.length > 0 ?
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
                            <p className="help">
                                You can save advanced filters by providing a label before applying the filters.
                            </p>
                        </div>
                    </div>
                    : null}

                <p className="mt-1 has-text-centered">
                    <a href="javascript:;" onClick={() => this.setState({showFiltersModal: true})}>
                        Advanced Filters
                    </a>
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
            <Sidebar onCloseRequest={() => this.closeSidebar()}>
                {this.state.showFilters ? this._renderFilters() : this._renderObservation()}
            </Sidebar>
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
                     style={{backgroundImage: marker.images.length > 0 ? `url('${marker.images[0]}')` : `url("//${window.location.hostname}/images/placeholder.png")`}}>
                    <a href="javascript:;"
                       className="sidebar-img-overlay flexbox flex-v-center flex-h-center flex-column"
                       onClick={() => {
                           this.setState({galleryImages: marker.images})
                           this.modal.open()
                       }}>
                        <i className="fa fa-photo"></i>
                        <div className="has-text-centered">
                            Click to Enlarge
                        </div>
                    </a>
                </div>
                <div className="sidebar-icons-container">
                    <div className="card-footer">
                        <a href="javascript:;" className="sidebar-icon" onClick={() => {
                            this.setState({galleryImages: marker.images})
                            this.modal.open()
                        }}>
                            <i className="fa fa-picture-o"></i>
                        </a>
                        <a href="javascript:;">
                            <i className="fa fa-star"></i>
                        </a>
                        <a href="javascript:;">
                            <i className="fa fa-flag"></i>
                        </a>
                    </div>
                </div>
                <div className="sidebar-content">
                    <h3 className="title is-4">
                        {marker.title}
                    </h3>

                    <div className="sidebar-item">
                        <h5><strong>Collection Date</strong></h5>
                        <p className="ml-1">{marker.date}</p>
                    </div>

                    {Object.keys(data).map(key => {
                        const label = typeof Labels[key] !== 'undefined' ? Labels[key] : key
                        return (
                            <div className="sidebar-item" key={key}>
                                <h5><strong>{label}</strong></h5>
                                <p className="ml-1">{data[key]}</p>
                            </div>
                        )
                    })}
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
                       showFilters   : !this.state.showFilters,
                       showSidebar   : !this.state.showFilters
                   })
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
                <img
                    src={item.original}
                    alt="Plant Image"
                    style={{height: window.innerHeight * .9, width: 'auto'}}
                />
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
        if (this.state.galleryImages.length === 0) {
            return (
                <Modal ref={ref => this.modal = ref}/>
            )
        }

        let images = []

        this.state.galleryImages.map(image => {
            images.push({
                original: image
            })
        })

        return (
            <Modal ref={ref => this.modal = ref}>
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

                <button
                    type="button"
                    className="button reset-map-button"
                    onClick={this.resetMapPosition.bind(this)}>
                    <span className="icon">
                        <i className="fa fa-search"></i>
                    </span>
                    <span>Reset Position</span>
                </button>
                {this._renderMap()}
                {this._renderFilterButton()}
                {this._renderBottomBar()}
                {this._renderImagesModal()}
                <Disclaimer ref={(ref) => this.disclaimer = ref}>
                    Notice: For privacy reasons, the location of the trees displayed on this map have been altered.
                    To learn more, visit our <a href="/faq">Frequently Asked Questions</a> page.
                </Disclaimer>

                <Copyright />

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