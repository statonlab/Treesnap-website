// Bootstrap Everything (loads dash and axios)
import './bootstrap'
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Copyright from './components/Copyright'
import Map from './UI/Map'
import Marker from './UI/Marker'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: []
        }
    }

    /**
     * Set the maps and load observations into the state.
     */
    componentDidMount() {
        this.maps = this.refs.maps.getMap()
        this.loadObservations();
    }

    /**
     * Gets observations from the API and parses them into markers.
     */
    loadObservations() {
        axios.get('/observations').then(response => {
            // Setup the observations to be rendered into markers
            let markers = []

            response.data.data.map(observation => {
                markers.push({
                    title: observation.observation_category,
                    images: observation.images,
                    position: {
                        latitude: observation.location.latitude,
                        longitude: observation.location.longitude
                    },
                    owner: observation.user.name
                })
            })

            // Add the markers to the state
            this.setState({markers})

        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <Map id="map" ref="maps">
                    {this.state.markers.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                maps={this.maps}
                                position={marker.position}
                                title={marker.title}
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