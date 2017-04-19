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

        return (
            <div className="spinner-overlay">
                <span className="spinner-container">
                    <i className="fa fa-refresh fa-spin"></i>
                </span>
            </div>
        )
    }
}

Spinner.PropTypes = {
    visible: PropTypes.bool.isRequired
}