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
        this.maps = new google.maps.Map(this.refs.mapContainer, {
            center: {lat: 40.354388, lng: -95.998237},
            scrollwheel: true,
            zoom: 4
        })

        this.setState({
            markers: [
                {
                    title: 'Hemlock',
                    position: {latitude: 40.354388, longitude: -95.998237},
                },
                {
                    title: 'Green Ash',
                    position: {latitude: 44.354388, longitude: -93.998237},
                },
                {
                    title: 'American Chestnut',
                    position: {latitude: 40.354388, longitude: -90.998237},
                },
                {
                    title: 'White Oak',
                    position: {latitude: 39.354388, longitude: -99.998237},
                },
                {
                    title: 'Hemlock',
                    position: {latitude: 39.354388, longitude: -92.998237},
                },
                {
                    title: 'Green Ash',
                    position: {latitude: 35.354388, longitude: -84.998237},
                },
                {
                    title: 'American Chestnut',
                    position: {latitude: 46.354388, longitude: -99.998237},
                },
                {
                    title: 'White Oak',
                    position: {latitude: 38.354388, longitude: -90.998237},
                }
            ]
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
                        >
                            <div>
                                {marker.title}
                            </div>
                        </Marker>
                    )
                })}
            </div>
        )
    }
}

Map.PropTypes = {}
