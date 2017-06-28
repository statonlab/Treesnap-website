import React, {Component, PropTypes} from 'react'

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-content-container">
                    <a className="close" onClick={this.props.onCloseRequest}>
                        <i className="fa fa-arrow-left"></i>
                    </a>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Sidebar.PropTypes = {
    name          : PropTypes.string.isRequired,
    onCloseRequest: PropTypes.func
}

Sidebar.defaultProps = {
    onCloseRequest() {
    }
}