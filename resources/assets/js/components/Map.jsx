import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'
import EventEmitter from '../helpers/EventEmitter'

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
      center               : {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      zoom                 : this.props.zoom,
      minZoom              : 4,
      mapTypeControlOptions: {
        style   : google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER
      }
    }

    this.maps = new google.maps.Map(this.refs.mapContainer, options)

    this.setState({
      center: options.center,
      zoom  : options.zoom
    })

    this.maps.addListener('idle', () => {
      this.props.onBoundsChange(this.maps.getBounds())
    })

    this.maps.addListener('click', () => EventEmitter.emit('mapClicked'))

    this.cluster = new MarkerClusterer(this.maps, [], {
      imagePath: '/images/map/m',
      maxZoom  : 7
    })

    google.maps.event.addListenerOnce(this.maps, 'idle', this.props.onLoad);
  }

  /**
   * Resize the map.
   */
  resize() {
    setTimeout(() => {
      google.maps.event.trigger(this.maps, 'resize')
    }, 300)
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
    //this.props.onBoundsChange(this.maps.getBounds())
    google.maps.event.trigger(this.maps, 'idle')
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
            maps     : this.maps,
            onCreate : (marker) => {
              this.markers.push(marker)
              this.createCluster()
            },
            onDestroy: (marker) => {
              this.markers = this.markers.filter(m => marker !== m)
              this.createCluster()
              marker.setMap(null)
            }
          })
        } else {
          return child
        }
      })
    }

    return null
  }

  getBounds() {
    return this.maps.getBounds()
  }

  /**
   * Create Cluster.
   */
  createCluster() {
    if (this.props.children.length === 0 && this.cluster !== null) {
      this.cluster.clearMarkers()
    }

    if (this.props.children.length > 0 && this.markers.length === this.props.children.length) {
      if (this.cluster !== null) {
        this.cluster.clearMarkers()
        this.cluster.addMarkers(this.markers)
        return
      }

      this.cluster = new MarkerClusterer(this.maps, this.markers, {
        imagePath: '/images/map/m',
        maxZoom  : 7
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
  onBoundsChange: PropTypes.func,
  onLoad: PropTypes.func,
}

Map.defaultProps = {
  center        : {
    lat: 40.354388,
    lng: -95.998237
  },
  zoom          : 4,
  onBoundsChange: (bounds) => {
  },
  onLoad() {}
}
