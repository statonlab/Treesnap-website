import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import User from '../../helpers/User'

export default class Sidebar extends Component {
  _renderMenu() {
    return (
      <aside className="menu" role="navigation" style={{minWidth: 200}}>
        <p className="menu-heading">Administration</p>
        <ul className="menu-list">
          <li>
            <NavLink exact={true} to="/" activeClassName="is-active">
              <i className="fa fa-dashboard"></i> Dashboard
            </NavLink>
          </li>
          {User.can('manage events') ?
          <li>
            <NavLink exact={true} to="/events" activeClassName="is-active">
              <i className="fa fa-calendar"></i> Events
            </NavLink>
          </li> : null }
          {User.can('manage users') ?
            <li>
              <NavLink to="/users" activeClassName="is-active">
                <i className="fa fa-user"></i> Users
              </NavLink>
            </li>
          : null}
          <li>
            <NavLink to="/groups" activeClassName="is-active">
              <i className="fa fa-users"></i> Groups
            </NavLink>
          </li>
          <li>
            <NavLink to="/observations" activeClassName="is-active">
              <i className="fa fa-tree"></i> Observations
            </NavLink>
          </li>
          <li>
            <NavLink to="/curate" activeClassName="is-active">
              <i className="fa fa-cubes"></i> Curate
            </NavLink>
          </li>
          <li>
            <NavLink to="/collections" activeClassName="is-active">
              <i className="fa fa-th"></i> Collections
            </NavLink>
          </li>
          <li>
            <NavLink to="/filters" activeClassName="is-active">
              <i className="fa fa-filter"></i> Filters
            </NavLink>
          </li>
        </ul>
      </aside>
    )
  }

  _renderCommands() {
    if (User.scientist()) {
      return null
    }

    return (
      <aside className="menu" role="navigation" style={{minWidth: 200}}>
        <p className="menu-heading mt-1">Commands</p>
        <ul className="menu-list">
          <li>
            <a href="/admin/clear-cache">
              <i className="fa fa-eraser"></i> Clear Cache
            </a>
          </li>
        </ul>
      </aside>
    )
  }

  render() {
    return (
      <div>
        {this._renderMenu()}
        {this._renderCommands()}
      </div>
    )
  }
}
