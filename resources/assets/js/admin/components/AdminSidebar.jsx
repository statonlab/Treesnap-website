import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class Sidebar extends Component {
    render() {
        return (
            <aside className="menu" role="navigation" style={{minWidth: 200}}>
                <p className="menu-heading">Administration</p>
                <ul className="menu-list">
                    <li><NavLink exact={true} to="/" activeClassName="is-active"><i className="fa fa-dashboard"></i> Dashboard</NavLink></li>
                    <li><NavLink to="/users" activeClassName="is-active"><i className="fa fa-user"></i> Users</NavLink></li>
                    <li><NavLink to="/groups" activeClassName="is-active"><i className="fa fa-users"></i> User Groups</NavLink></li>
                    <li><NavLink to="/observations" activeClassName="is-active"><i className="fa fa-tree"></i> Observations</NavLink></li>
                    <li><NavLink to="/curate" activeClassName="is-active"><i className="fa fa-cubes"></i> Curate</NavLink></li>
                    <li><NavLink to="/collections" activeClassName="is-active"><i className="fa fa-th"></i> Collections</NavLink></li>
                    <li><NavLink to="/filters" activeClassName="is-active"><i className="fa fa-filter"></i> Filters</NavLink></li>
                </ul>
            </aside>
        )
    }
}