import React, {Component, PropTypes} from 'react'

export default class InfoBox extends Component {

    render() {
        return (
            <div className={`box info-box ${this.props.style}`}>
                <h4 className="title is-4">{this.props.title}</h4>
                <div className="info-box-text">{this.props.body}</div>
            </div>
        )
    }
}

InfoBox.PropTypes = {
    icon : PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body : PropTypes.string.isRequired,
    style: PropTypes.string
}

InfoBox.defaultProps = {
    style: 'is-primary'
}