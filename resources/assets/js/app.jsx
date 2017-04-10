/**
 * TreeSource Website Entry Point JS File
 */
// Bootstrap Everything (loads dash and a configured axios)
import './bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Copyright from './components/Copyright'
import Map from './UI/Map'
import Marker from './UI/Marker'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.defaultMapPosition = {
            center: {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom: 4
        }

        this.state = {
            markers: [],
            categories: {},
            center: {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom: 4
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
        axios.get('/observations').then(response => {
            let categories = {}
            // Setup the observations to be rendered into markers
            response.data.data.map((observation, index) => {
                let category = observation.observation_category

                // Set the category
                categories[category] = true

                this.allMarkers.push({
                    title: category,
                    images: observation.images,
                    position: {
                        latitude: observation.location.latitude,
                        longitude: observation.location.longitude
                    },
                    accuracy: observation.location.accuracy,
                    owner: observation.user.name,
                    show: true
                })
            })

            // Add the markers to the state
            this.setState({
                markers: this.allMarkers,
                categories
            })
        }).catch(error => {
            console.log(error)
        })
    }

    /**
     * Zoom to marker.
     *
     * @param marker
     */
    goToSubmission(marker) {
        this.setState({
            center: {
                lat: marker.position.latitude,
                lng: marker.position.longitude
            },
            zoom: 18
        })
    }

    /**
     * Render individual submission.
     *
     * @param marker
     * @param index
     * @returns {XML}
     */
    renderSubmission(marker, index) {
        return (
            <a
                href="#"
                className="box"
                style={{padding: 10, marginBottom: '.5em'}}
                key={index}
                onClick={() => this.goToSubmission.call(this, marker)}
            >
                <div className="media">
                    {marker.images.length < 1 ? null :
                        <div className="media-left">
                            <img src={marker.images[0]} alt={marker.title} style={{width: 50, height: 'auto'}}/>
                        </div>
                    }
                    <div className="media-content">
                        <strong>{marker.title}</strong>
                        <p style={{color: '#666', fontWeight: '500', fontSize: '14px'}}>
                            {marker.owner}
                        </p>
                    </div>
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
        let categories = this.state.categories

        this.state.markers.map(marker => {
            if (marker.title == name) {
                marker.show = !marker.show
                categories[name] = marker.show
            }
            filteredMarkers.push(marker)
        })

        this.setState({
            markers: filteredMarkers,
            categories: categories
        })
    }

    /**
     * Reset the position to the center and zoom out.
     */
    resetMapPosition() {
        this.setState({
            center: this.defaultMapPosition.center,
            zoom: this.defaultMapPosition.zoom
        })
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
     * Render the scene.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Navbar />
                <Sidebar>
                    <form action="#" method="get" className="mb-1">
                        <p className="mb-0 text-underline">
                            <strong>Search</strong>
                        </p>
                        <div className="field has-addons">
                            <p className="control flex-grow">
                                <input className="input" type="search" placeholder="Search" onChange={this.search.bind(this)}/>
                            </p>
                            <p className="control">
                                <button type="submit" className="button is-primary">
                                    <i className="fa fa-search"></i>
                                </button>
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
                                   onClick={() => this.filterByPlant.call(this, name)}>
                                    <span className="icon">
                                        <i className="fa fa-check"></i>
                                    </span>
                                    <span>{name}</span>
                                </a>
                            )
                        })}
                    </div>

                    <p className="mb-0 text-underline" style={{marginTop: '1em'}}>
                        <strong>Submissions</strong>
                    </p>
                    {this.state.markers.map((marker, index) => {
                        if (!marker.show) return
                        return this.renderSubmission(marker, index)
                    })}
                </Sidebar>

                <button
                    type="button"
                    className="button reset-map-button"
                    onClick={this.resetMapPosition.bind(this)}>
                    Reset Position
                </button>

                <Map id="map"
                     ref="maps"
                     center={this.state.center}
                     zoom={this.state.zoom}
                >
                    {this.state.markers.map((marker, index) => {
                        return (
                            <Marker key={index}
                                    position={marker.position}
                                    title={marker.title}
                                    show={marker.show}
                            >
                                <div className="media callout">
                                    <div className="media-left mr-0">
                                        <img src={marker.images[0]} alt={marker.title} style={{
                                            width: 50,
                                            height: 'auto'
                                        }}/>
                                    </div>
                                    <div className="media-content">
                                        <div className="mb-0"><strong>{marker.title}</strong></div>
                                        <div className="mb-0">By {marker.owner}</div>
                                        <a href="#">See full description</a>
                                    </div>
                                </div>
                            </Marker>
                        )
                    })}
                </Map>
                <Copyright />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app-root'))