import React, {Component, PropTypes} from 'react'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="sidebar">
                <a className="close" onClick={this.props.onCloseRequest}>
                    <i className="fa fa-times"></i>
                </a>
                {this.props.children}
            </div>
        )
    }
}

Sidebar.PropTypes = {
    name: PropTypes.string.isRequired,
    onCloseRequest: PropTypes.func
}

Sidebar.defaultProps = {
    onCloseRequest() {}
}