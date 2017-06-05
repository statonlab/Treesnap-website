import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Spinner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    /**
     * Set the spinner's initial visibility.
     */
    componentDidMount() {
        this.setState({visible: this.props.visible})
    }

    /**
     * Set the spinner's visibility based on properties.
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        if (props.visible !== this.state.visible) {
            this.setState({visible: props.visible})
        }
    }

    /**
     * Render Spinner.
     *
     * @returns {*}
     */
    render() {
        if (!this.state.visible) {
            return null
        }

        // Render the inline spinner
        if(this.props.inline) {
            return (
                <div className="mt-1" style={this.props.containerStyle}>
                    <i className="fa fa-refresh fa-spin fa-2x"></i>
                </div>
            )
        }

        // Render a full page spinner
        return (
            <div className="spinner-overlay"
                 style={this.props.containerStyle}>
                <span className="spinner-container">
                    <i className="fa fa-refresh fa-spin"></i>
                </span>
            </div>
        )
    }
}

Spinner.PropTypes = {
    visible       : PropTypes.bool.isRequired,
    containerStyle: PropTypes.object,
    inline        : PropTypes.bool
}

Spinner.defaultProps = {
    containerStyle: {},
    inline        : false
}