import '../bootstrap'
import React, {Component, PropTypes} from 'react'
import Marker from './Marker'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: []
        }
    }

    componentDidMount() {
        // Initialize the map
        this.maps = new google.maps.Map(this.refs.mapContainer, {
            center: {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom: 4
        })

        // Get the markers
        this.loadObservations()
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
                    }
                })
            })

            // Add the markers to the state
            //this.setState({markers})

        }).catch(error => {
            console.log(error)
        })

        this.setState({
            markers: [{
                title: 'Mine',
                position: {
                    latitude: -95.998237,
                    longitude: 30.0003
                }
            }]
        })
    }

    render() {
        return (
            <div id="map" ref="mapContainer">
                {this.state.markers.map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            maps={this.maps}
                            position={marker.position}
                            title={marker.title}
                        >
                            <div>{marker.title}</div>
                        </Marker>
                    )
                })}
            </div>
        )
    }
}

Map.PropTypes = {}
