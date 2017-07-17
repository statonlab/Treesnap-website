import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Path from '../helpers/Path'
import {NavLink} from 'react-router-dom'

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: false
        }
    }

    toggle() {
        this.setState({isActive: !this.state.isActive})
    }

    render() {
        return (
            <nav className={`navbar${this.props.home ? ' home-nav' : ''}`}>
                <div className={`${!this.props.container ? 'container' : 'container is-fluid'}`}>
                    <div className="navbar-brand">
                        <NavLink to="/" className="navbar-item">
                            <img src={`/logo/ts-logo-${this.props.home ? '96' : '32'}.png`}
                                 alt="Logo"
                                 className="logo-img"/>
                            <span className="logo-text"><b>Tree</b><span style={{fontWeight: 300}}>Snap</span></span>
                        </NavLink>

                        <div className="navbar-burger" onClick={this.toggle.bind(this)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className={`navbar-menu${this.state.isActive ? ' is-active' : ''}`}>
                        <div className="navbar-end">
                            <a href="https://www.facebook.com/treesnapapp/" className="navbar-item">
                                <span className="icon">
                                    <i className="fa fa-facebook"></i>
                                </span>
                            </a>
                            <a href="https://twitter.com/Treesnapapp" className="navbar-item">
                                <span className="icon">
                                    <i className="fa fa-twitter"></i>
                                </span>
                            </a>
                        </div>

                        <div className="navbar-end">
                            <NavLink exact={true} to="/" className={`navbar-item`} activeClassName={'is-active'}>
                                Home
                            </NavLink>

                            <NavLink to="/map" className={`navbar-item`} activeClassName={'is-active'}>
                                Map
                            </NavLink>

                            <NavLink to="/about" className={`navbar-item`} activeClassName={'is-active'}>
                                About
                            </NavLink>
                            {window.TreeSnap.loggedIn ?
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <NavLink to="/account" className={`navbar-link`} activeClassName={'is-active'}>
                                        Account
                                    </NavLink>
                                    <div className="navbar-dropdown">
                                        <NavLink to="/account/observations" className={`navbar-item`} activeClassName={'is-active'}>
                                            My Observations
                                        </NavLink>
                                        <NavLink to="/account/groups" className={`navbar-item`} activeClassName={'is-active'}>
                                            Groups
                                        </NavLink>
                                        <NavLink to="/account/collections" className={`navbar-item`} activeClassName={'is-active'}>
                                            Collections
                                        </NavLink>
                                        <NavLink to="/account/filters" className={`navbar-item`} activeClassName={'is-active'}>
                                            Filters
                                        </NavLink>
                                        <hr className="navbar-divider"/>
                                        <NavLink to="/account" className={`navbar-item`} activeClassName={'is-active'}>
                                            Settings
                                        </NavLink>
                                        <a href="/logout" className="navbar-item">
                                            Logout
                                        </a>
                                    </div>
                                </div>
                                : null}


                            {!window.TreeSnap.loggedIn ?
                                <a href="/login" className={`navbar-item ${Path.isActive('/login')}`}>
                                    Login
                                </a>
                                : null}

                            {!window.TreeSnap.loggedIn ?
                                <a href="/register" className={`navbar-item ${Path.isActive('/register')}`}>
                                    Register
                                </a>
                                : null}

                            {window.TreeSnap.isAdmin ?
                                <a href="/admin" className={`navbar-item ${Path.isActive('/admin', false)}`}>Admin</a>
                                : null}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.PropTypes = {
    container: PropTypes.bool,
    home     : PropTypes.bool
}

Navbar.defaultProps = {
    container: false,
    home     : false
}
