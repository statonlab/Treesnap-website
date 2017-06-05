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

export default class App extends Component {
    constructor(props) {
        super(props)

        this.defaultMapPosition = {
            center: {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom  : 4
        }

        this.state = {
            markers       : [],
            categories    : {},
            center        : {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom          : 4,
            selectedMarker: null,
            galleryImages : [],
            showSidebar   : false,
            loading       : false
        }

        this.allMarkers = []
    }

    /**
     * Set the maps and load observations into the state.
     */
    componentDidMount() {
        this.loadObservations()
    }

    /**
     * Gets observations from the API and parses them into markers.
     */
    loadObservations() {
        this.setState({loading: true})

        axios.get('/observations').then(response => {
            let categories = {}
            // Setup the observations to be rendered into markers
            response.data.data.map((observation, index) => {
                let category = observation.observation_category

                // Set the category
                categories[category] = true

                // parse images
                let images = []
                Object.keys(observation.images).map(key => {
                    observation.images[key].map(image => {
                        images.push(image)
                    })
                })

                this.allMarkers.push({
                    id      : observation.observation_id,
                    title   : category,
                    images  : images,
                    position: {
                        latitude : observation.location.latitude,
                        longitude: observation.location.longitude,
                        accuracy : observation.location.accuracy
                    },
                    owner   : observation.user.name,
                    show    : true,
                    date    : observation.date_human_diff,
                    data    : observation.meta_data,
                    ref     : null
                })
            })

            // Add the markers to the state
            this.setState({
                markers: this.allMarkers,
                categories
            })
        }).catch(error => {
            console.log(error)
        }).then(() => {
            this.setState({loading: false})
        })
    }

    /**
     * Zoom to marker.
     *
     * @param marker
     */
    goToSubmission(marker) {
        this.refs.maps.goTo({
            lat: marker.position.latitude,
            lng: marker.position.longitude
        }, 24)
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
                href="#"
                role="button"
                className="bar-item"
                style={{backgroundImage: `url(${image})`}}
                key={index}
                onClick={(e) => {
                    if (e.nativeEvent) {
                        e.nativeEvent.preventDefault()
                    }
                    this.setState({
                        selectedMarker: marker,
                        showSidebar   : true
                    })
                    this.goToSubmission.call(this, marker)
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
     * Allow users to filter submissions by plant.
     *
     * @param name
     */
    filterByPlant(name) {
        let filteredMarkers = []
        let categories      = this.state.categories

        this.state.markers.map(marker => {
            if (marker.title === name) {
                marker.show      = !marker.show
                categories[name] = marker.show
            }
            filteredMarkers.push(marker)
        })

        this.setState({
            markers   : filteredMarkers,
            categories: categories
        })
    }

    /**
     * Reset the position to the center and zoom out.
     */
    resetMapPosition() {
        this.refs.maps.goTo(this.defaultMapPosition.center, this.defaultMapPosition.zoom)
    }

    /**
     * search by plant name or username.
     *
     * @param term
     */
    search(event) {
        let term = event.target.value
        if (term.length === 0) {
            this.setState({markers: this.allMarkers})
            return
        }

        term = term.toLowerCase()

        let markers = this.allMarkers.filter((marker) => {
            return (marker.title.toLowerCase().indexOf(term) > -1 || marker.owner.toLowerCase().indexOf(term) > -1)
        })

        this.setState({markers})
    }

    /**
     * Handle map bounds changes.
     *
     * @param newBounds
     */
    boundsChanged(newBounds) {

        this.allMarkers.map(marker => {
            let pos = {
                lat: marker.position.latitude,
                lng: marker.position.longitude
            }

            marker.show = newBounds.contains(pos)
        })

        this.setState({markers: this.allMarkers})
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
                {this.state.markers.map((marker, index) => {
                    return (
                        <Marker key={index}
                                position={marker.position}
                                title={marker.title}
                                show={marker.show}
                                ref={(ref) => marker.ref = ref}
                                onClick={() => {
                                    this.setState({
                                        selectedMarker: this.state.markers[index],
                                        showSidebar   : true
                                    })
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
        let rendered = 0
        return (
            <div className="horizontal-bar" id="horizontal-bar-container">
                <a href="javascript:;" className="scroll scroll-left" onClick={this.scrollLeft.bind(this)}>
                    <i className="fa fa-chevron-left"></i>
                </a>
                <div className="bar-items-container dragscroll"
                     id="horizontal-bar"
                     onScroll={this.setScrollState.bind(this)}>
                    {this.state.markers.map((marker, index) => {
                        if (!marker.show) return
                        if (rendered >= 50) return
                        rendered++
                        return this._renderSubmission(marker, index)
                    })}
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
            <div>
                <form action="#" method="get" className="mb-1" onSubmit={(e) => {
                    e.nativeEvent ? e.nativeEvent.preventDefault() : null
                }}>
                    <p className="mb-0 text-underline">
                        <strong>Search</strong>
                    </p>
                    <div className="field">
                        <p className="control has-icon has-icon-right">
                            <input className="input" type="search" placeholder="Search" onChange={this.search}/>
                            <div className="icon is-small">
                                <i className="fa fa-search"></i>
                            </div>
                        </p>
                    </div>
                </form>

                <p className="mb-0 text-underline">
                    <strong>Filter by Plant</strong>
                </p>
                <div className="checkbox-container">
                    {Object.keys(this.state.categories).map((name, index) => {
                        return (
                            <a key={index}
                               href="#"
                               className={`button is-full checkbox-button${this.state.categories[name] ? ' is-active' : ''}`}
                               onClick={(e) => {
                                   if (e.nativeEvent) {
                                       e.nativeEvent.preventDefault()
                                   }
                                   this.filterByPlant.call(this, name)
                               }}>
                                <span className="icon">
                                    <i className="fa fa-check"></i>
                                </span>
                                <span>{name}</span>
                            </a>
                        )
                    })}
                </div>
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
        if (marker === null) {
            return (<Sidebar/>)
        }

        let data = marker.data

        return (
            <Sidebar onCloseRequest={() => this.setState({showSidebar: false})}>
                <div className="sidebar-img"
                     style={{backgroundImage: marker.images.length > 0 ? `url('${marker.images[0]}')` : `url("//${window.location.hostname}/images/placeholder.png")`}}>
                </div>
                <div className="sidebar-icons-container">
                    <a href="javascript:;" className="sidebar-icon" onClick={() => {
                        this.setState({galleryImages: marker.images})
                        this.modal.open()
                    }}>
                        <i className="fa fa-picture-o"></i>
                        <span>See all images</span>
                    </a>
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
                        return (
                            <div className="sidebar-item" key={key}>
                                <h5><strong>{key}</strong></h5>
                                <p className="ml-1">{data[key]}</p>
                            </div>
                        )
                    })}
                </div>
            </Sidebar>
        )
    }

    /**
     * Render the filter bar and expand button.
     *
     * @returns {XML}
     * @private
     */
    _renderFilterBar() {
        return (
            <div className="filters-bar"></div>
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
            <div className='image-gallery-image'
                 style={{backgroundColor: this.state.galleryImages.length > 1 ? '#222' : 'transparent'}}>
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
                <Navbar/>

                {this._renderSidebar()}

                <button
                    type="button"
                    className="button reset-map-button"
                    onClick={this.resetMapPosition.bind(this)}>
                    Reset Position
                </button>
                {this._renderMap()}
                {this._renderFilterBar()}
                {this._renderBottomBar()}
                {this._renderImagesModal()}
                <Copyright />
                <Spinner visible={this.state.loading} containerStyle={{backgroundColor: 'rgba(255,255,255,0.2)'}}/>
            </div>
        )
    }
}