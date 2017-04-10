import React, {Component, PropTypes} from 'react'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="sidebar">
                {this.props.children}
            </div>
        )
    }
}

Sidebar.PropTypes = {
    name: PropTypes.string.isRequired
}