import React, {Component, PropTypes} from 'react'
import Marker from './Marker'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.cluster = null
        this.markers = []
        this.colors  = {
            'American Chestnut': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            'Ash'              : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            'Hemlock'          : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            'White Oak'        : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            'Other'            : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
        }
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
            minZoom: 3,
            maxZoom: window.Laravel.isAdmin ? null : 16
        }

        this.maps = new google.maps.Map(this.refs.mapContainer, options)

        this.setState({
            center: options.center,
            zoom  : options.zoom
        })

        this.maps.addListener('zoom_changed', () => {
            this.props.onBoundsChange(this.maps.getBounds())
            let zoom = this.maps.getZoom()
            this.markers.map(marker => {
                let icon
                if (window.Laravel.isAdmin) {
                    icon = this.colors[marker.title]
                } else {
                    icon = {
                        path        : google.maps.SymbolPath.CIRCLE,
                        fillColor   : 'green',
                        fillOpacity : 0.8,
                        scale       : 10 * zoom,
                        strokeColor : 'rgba(0,0,0,.3)',
                        strokeWeight: 1
                    }

                    if (zoom > 15) {
                        marker.setLabel(marker.title)
                    } else {
                        marker.setLabel('')
                    }
                }
                marker.setIcon(icon)
            })
        })

        this.maps.addListener('dragend', () => {
            this.props.onBoundsChange(this.maps.getBounds())
        })

        this.maps.addListener('click', () => {
            this.props.onBoundsChange(this.maps.getBounds())
        })
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
                imagePath: '/images/m',
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
