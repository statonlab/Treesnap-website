import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import InfoWindow from '../helpers/InfoWindow'
import EventEmitter from '../helpers/EventEmitter'
import User from '../helpers/User'

export default class Marker extends Component {
  constructor(props) {
    super(props)

    this.marker = ''

    this.colors = {
      'American Chestnut': 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      'Ash'              : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'Hemlock'          : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      'White Oak'        : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      'Other'            : 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    }

    this.event = EventEmitter.listen('mapClicked', () => {
      if (this.callout) {
        this.callout.close()
      }
    })
  }

  /**
   * Creates the marker and adds it to the map.
   */
  componentWillMount() {
    // Create a marker
    this.marker = new google.maps.Marker({
      title   : this.props.title,
      position: {
        lat: this.props.position.latitude,
        lng: this.props.position.longitude
      },
      map     : this.props.maps
    })

    // Create a Callout
    this.callout = InfoWindow

    this.marker.setVisible(this.props.show)

    // Handle click events on the callout
    this.marker.addListener('click', this.openCallout.bind(this))

    let icon
    if (User.can('view accurate location') || User.owns(this.props.owner_id)) {
      icon = this.colors[this.marker.title] || 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    } else {
      icon = '/images/map/q-dot.png'
    }
    this.marker.setIcon(icon)
    this.props.onCreate(this.marker)
  }

  /**
   * Open the callout window.
   */
  openCallout() {
    this.callout.close()
    this.callout.setContent(this.renderCallout())
    this.callout.open(this.props.map, this.marker)
    this.props.onClick()
  }

  /**
   * Update properties when needed.
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.marker.setVisible(nextProps.show)
  }

  /**
   * Creates a DOM element for the callout
   *
   * @returns {Element}
   */
  renderCallout() {
    let callout = document.createElement('div')
    ReactDOM.render(this.props.children, callout)
    return callout
  }

  /**
   * Not needed because we are using Google's JS API
   * @returns {null}
   */
  render() {
    return (null)
  }

  componentWillUnmount() {
    this.props.onDestroy(this.marker)
  }
}

Marker.PropTypes = {
  maps     : PropTypes.object.isRequired,
  position : PropTypes.object.isRequired,
  title    : PropTypes.string,
  show     : PropTypes.bool,
  onCreate : PropTypes.func,
  onClick  : PropTypes.func,
  onDestroy: PropTypes.func,
  owner_id: PropTypes.number
}

Marker.defaultProps = {
  title: '',
  show : true,
  onCreate() {
  },
  onClick() {
  },
  onHide() {
  },
  owner_id: 0
}