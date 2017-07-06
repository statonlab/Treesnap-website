import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

export default class LinksSidebar extends Component {
    render() {
        return (
            <aside className="menu admin-sidebar" role="navigation">
                {this.props.title !== '' ? <p className="menu-heading">{this.props.title}</p> : null}
                <ul className="menu-list">
                    {this.props.links.map((link, index) => {
                       return (
                           <li key={index}>
                               <NavLink to={link.to} activeClassName={'is-active'} exact={true}>
                                   <i className={`fa ${link.icon}`}></i> {link.label}
                               </NavLink>
                           </li>
                       )
                    })}
                </ul>
            </aside>
        )
    }
}

LinksSidebar.PropTypes = {
    links: PropTypes.array.isRequired,
    title: PropTypes.string
}

LinksSidebar.defaultProps = {
    title: ''
}
