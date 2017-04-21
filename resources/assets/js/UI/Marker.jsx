import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import InfoWindow from '../helpers/InfoWindow'

export default class Marker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Set the initial state for the callout
            calloutOpen: false
        }

        this.marker = ''

        this.shouldUpdate = true

        this.colors = {
            'American Chestnut': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            'Ash'              : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            'Hemlock'          : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            'White Oak'        : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            'Other'            : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
        }
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
        this.marker.setIcon(this.colors[this.props.title])
        this.props.onCreate(this.marker)
    }

    /**
     * Open the callout window.
     */
    openCallout() {
        this.callout.close()
        this.callout.setContent(this.renderCallout())
        this.callout.open(this.props.map, this.marker)
        this.setState({calloutOpen: !this.state.calloutOpen})
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
}

Marker.PropTypes = {
    maps    : PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    title   : PropTypes.string,
    show    : PropTypes.boolean,
    onCreate: PropTypes.func,
    onClick : PropTypes.func
}

Marker.defaultProps = {
    title   : '',
    onCreate: () => {
    },
    onClick : () => {
    }
}