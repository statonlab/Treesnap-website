import React, {Component, PropTypes} from 'react'

export default class Map extends Component {
    /**
     * Initializes the map.
     */
    componentDidMount() {
        // Initialize the map
        this.maps = new google.maps.Map(this.refs.mapContainer, {
            center: {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom: 4
        })
    }

    /**
     * Returns a reference to the map
     *
     * @returns {google.maps.Map|Map|*}
     */
    getMap() {
        return this.maps
    }

    render() {
        return (
            <div ref="mapContainer" {...this.props}>
                {this.props.children}
            </div>
        )
    }
}

Map.PropTypes = {}

Map.defaultProps = {}
