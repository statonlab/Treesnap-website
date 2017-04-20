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
            center : {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            zoom   : this.props.zoom,
            minZoom: 3
        }

        this.maps = new google.maps.Map(this.refs.mapContainer, options)

        this.setState({
            center: options.center,
            zoom  : options.zoom
        })

        this.maps.addListener('zoom_changed', () => {
            this.props.onBoundsChange(this.maps.getBounds())
        })

        this.maps.addListener('dragend', () => {
            this.props.onBoundsChange(this.maps.getBounds())
        })

        this.maps.addListener('click', () => {
            this.props.onBoundsChange(this.maps.getBounds())
        })
    }

    /**
     * Deal with changing regions.
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        /*if (nextProps.center.lng !== nextProps.center.lat || nextProps.center.lng !== nextProps.center.lng) {
         this.maps.setCenter(nextProps.center)
         }

         if (nextProps.zoom !== this.state.center.zoom) {
         this.maps.setZoom(nextProps.zoom)
         }*/
    }

    /**
     * Zoom to location.
     *
     * @param center
     * @param zoom
     */
    goTo(center, zoom = 20) {
        this.maps.setCenter(center)
        this.maps.setZoom(zoom)
        this.props.onBoundsChange(this.maps.getBounds())
    }

    /**
     * Render children (markers) by passing the map to them.
     *
     * @returns {*}
     */
    renderChildren() {
        return React.Children.map(this.props.children, child => {
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
    }

    /**
     * Create Cluster.
     */
    createCluster() {
        // Create the cluster after we collect all the markers from the children list
        // and only if the cluster hasn't been created yet.
        if (this.cluster !== null) {
            return
        }

        if (this.props.children.length > 0 && this.markers.length === this.props.children.length) {
            this.cluster = new MarkerClusterer(this.maps, this.markers, {
                imagePath: '/images/m'
            })
        }
    }

    render() {
        return (
            <div ref="mapContainer" {..._.omit(this.props, ['center', 'zoom', 'onBoundsChange'])}>
                {this.renderChildren()}
            </div>
        )
    }
}

Map.PropTypes = {
    center        : PropTypes.object,
    zoom          : PropTypes.number,
    onBoundsChange: PropTypes.func
}

Map.defaultProps = {
    center        : {
        lat: 40.354388,
        lng: -95.998237
    },
    zoom          : 4,
    onBoundsChange: (bounds) => {
    }
}
