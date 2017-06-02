import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DropdownItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let props = {
            href: this.props.href || 'javascript:;',
            onClick: this.props.onClick !== null ? this.props.onClick : null
        }
        return (
            <li><a {...props}>{this.props.children}</a></li>
        )
    }
}

DropdownItem.PropTypes = {
    onClick: PropTypes.func,
    href: PropTypes.string
}

DropdownItem.defaultProps = {
    onClick: null,
    href: null
}