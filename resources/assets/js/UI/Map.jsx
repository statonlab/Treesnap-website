import React, {Component, PropTypes} from 'react'
import Marker from './Marker'

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
     * Render children (markers) by passing the map to them.
     * @returns {*}
     */
    renderChildren() {
        return React.Children.map(this.props.children, child => {
            if (child.type == Marker) {
                return React.cloneElement(child, {
                    maps: this.maps
                })
            } else {
                return child
            }
        })
    }

    render() {
        return (
            <div ref="mapContainer" {...this.props}>
                {this.renderChildren()}
            </div>
        )
    }
}

Map.PropTypes = {}

Map.defaultProps = {}
