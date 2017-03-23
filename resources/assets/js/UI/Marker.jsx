import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

export default class Marker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            calloutOpen: false
        }
    }

    componentDidMount() {
        this.marker = new google.maps.Marker({
            title: this.props.title,
            position: {lat: this.props.position.latitude, lng: this.props.position.longitude},
            map: this.props.maps
        })


        this.callout = new google.maps.InfoWindow({
            content: this.renderCallout(),
            maxWidth: 200
        })

        this.marker.addListener('click', () => {
            if (this.state.calloutOpen) {
                this.callout.close()
            } else {
                this.callout.open(this.props.map, this.marker)
            }

            this.setState({calloutOpen: !this.state.calloutOpen})
        })
    }

    renderCallout() {
        let callout = document.createElement('div')
        ReactDOM.render(this.props.children, callout)
        return callout
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

Marker.PropTypes = {
    maps: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    title: PropTypes.string
}

Marker.defaultProps = {
    title: ''
}