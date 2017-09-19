import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

export default class LinksSidebar extends Component {
  render() {
    return (
      <div>
        <aside className="menu admin-sidebar is-hidden-mobile" role="navigation">
          {this.props.title !== '' ? <p className="menu-heading">{this.props.title}</p> : null}
          <ul className="menu-list">
            {this.props.links.map((link, index) => {
              return (
                <li key={`sidebar_${index}`}>
                  <NavLink to={link.to} activeClassName={'is-active'} exact={true}>
                    <i className={`fa ${link.icon}`}></i> {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </aside>

        <aside className="tabs is-hidden-tablet home-tabs">
          {this.props.links.map((link, index) => {
            return (
              <li key={`sidebar_tab_${index}`}>
                <NavLink to={link.to} activeClassName={'is-active'} exact={true}>
                  <span className="icon is-small"><i className={`fa ${link.icon}`}></i></span>
                  <span>{link.label}</span>
                </NavLink>
              </li>
            )
          })}
        </aside>
      </div>
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
