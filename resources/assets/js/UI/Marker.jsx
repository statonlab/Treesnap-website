import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

export default class Marker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Set the initial state for the callout
            calloutOpen: false,
            // Whether to display the marker
            show       : true
        }

        this.marker = ''
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
        this.callout = new google.maps.InfoWindow({
            content : this.renderCallout(),
            maxWidth: 250
        })

        this.marker.setVisible(this.props.show)
        this.setState({show: this.props.show})

        // Handle click events on the callout
        this.marker.addListener('click', () => {
            if (this.state.calloutOpen) {
                this.callout.close()
            } else {
                this.callout.open(this.props.map, this.marker)
            }

            this.setState({calloutOpen: !this.state.calloutOpen})
        })

        this.props.onCreate(this.marker)
    }

    /**
     * Update properties when needed.
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show})
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
    onCreate: PropTypes.func.isRequired
}

Marker.defaultProps = {
    title: '',
    show : true
}