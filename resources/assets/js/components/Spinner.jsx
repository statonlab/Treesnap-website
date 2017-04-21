import React, {Component, PropTypes} from 'react'

export default class Spinner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.setState({visible: this.props.visible})
    }

    componentWillReceiveProps(props) {
        if (props.visible !== this.state.visible) {
            this.setState({visible: props.visible})
        }
    }

    render() {
        if (!this.state.visible) {
            return null
        }

        if(this.props.inline) {
            return (
                <div className="mt-1" style={this.props.containerStyle}>
                    <i className="fa fa-refresh fa-spin fa-2x"></i>
                </div>
            )
        }

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