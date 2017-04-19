import React, {Component, PropTypes} from 'react'
import Marker from './Marker'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.cluster = null
        this.markers = []
    }

    /**
     * Initializes the map.
     */
    componentDidMount() {
        // Initialize the map
        let options = {
            center: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            zoom  : this.props.zoom
        }

        this.maps = new google.maps.Map(this.refs.mapContainer, options)

        this.setState({
            center: options.center,
            zoom  : options.zoom
        })
    }

    /**
     * Deal with changing regions.
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.center.lng !== nextProps.center.lat || nextProps.center.lng !== nextProps.center.lng) {
            this.maps.setCenter(nextProps.center)
        }

        if (nextProps.zoom !== this.state.center.zoom) {
            this.maps.setZoom(nextProps.zoom)
        }
    }

    /**
     * Render children (markers) by passing the map to them.
     * @returns {*}
     */
    renderChildren() {
        let children = React.Children.map(this.props.children, child => {
            if (child.type === Marker) {
                return React.cloneElement(child, {
                    maps    : this.maps,
                    onCreate: (marker) => {
                        this.markers.push(marker)
                        this.createCluster()
                    }
                })
            } else {
                return child
            }
        })
        console.log('Printing Length', this.props.children.length)

        return children
    }

    /**
     * Create Cluster
     * @param markers
     */
    createCluster() {
        if (this.props.children.length > 0 && this.markers.length === this.props.children.length && this.cluster === null) {
            this.cluster = new MarkerClusterer(this.maps, this.markers, {
                imagePath: '/images/m'
            })
        }
    }

    render() {
        return (
            <div ref="mapContainer" {..._.omit(this.props, ['center', 'zoom'])}>
                {this.renderChildren()}
            </div>
        )
    }
}

Map.PropTypes = {
    center: PropTypes.object,
    zoom  : PropTypes.number
}

Map.defaultProps = {
    center: {
        lat: 40.354388,
        lng: -95.998237
    },
    zoom  : 4
}
