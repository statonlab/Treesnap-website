import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.cluster = null
        this.markers = []
        this.colors  = {
            'American Chestnut': 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            'Ash'              : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            'Hemlock'          : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            'White Oak'        : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            'Other'            : 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
        }
    }

    /**
     * Initializes the map.
     */
    componentDidMount() {
        let options = {
            center : {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            zoom   : this.props.zoom,
            minZoom: 3,
            maxZoom: window.Laravel.isAdmin ? null : 16
        }

        this.maps = new google.maps.Map(this.refs.mapContainer, options)

        this.setState({
            center: options.center,
            zoom  : options.zoom
        })

        /*this.maps.addListener('zoom_changed', window.throttle(() => {
         this.props.onBoundsChange(this.maps.getBounds())
         }, 250, this))*/

        this.maps.addListener('idle', window.throttle(() => {
            this.props.onBoundsChange(this.maps.getBounds())
        }, 500, this))

        /*this.maps.addListener('click', window.throttle(() => {
         this.props.onBoundsChange(this.maps.getBounds())
         }, 1000, this))*/
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
        if (this.refs && this.refs.mapContainer) {
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

        return null
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
                imagePath: '/images/map/m',
                maxZoom  : window.Laravel.isAdmin ? 18 : 15
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
