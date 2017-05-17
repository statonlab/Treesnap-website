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
            <nav className={`nav${this.props.home ? ' home-nav' : ''}`}>
                <div className={`${!this.props.container ? 'container' : 'container is-fluid'}`}>
                    <div className="nav-left nav-brand">
                        <NavLink to="/" className="nav-item">
                            <img src={`/logo/ts-logo-${this.props.home ? '96' : '32'}.png`} alt="Logo" className="logo-img"/>
                            <span className="logo-text"><b>Tree</b><span style={{fontWeight: 300}}>snap</span></span>
                        </NavLink>
                    </div>

                    <div className="nav-center">
                        <a href="https://www.facebook.com/treesnapapp/" className="nav-item">
                            <span className="icon">
                                <i className="fa fa-facebook"></i>
                            </span>
                        </a>
                        <a href="https://twitter.com/Treesnapapp" className="nav-item">
                            <span className="icon">
                                <i className="fa fa-twitter"></i>
                            </span>
                        </a>
                    </div>

                    <div className="nav-toggle" onClick={this.toggle.bind(this)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={`nav-right nav-menu${this.state.isActive ? ' is-active' : ''}`}>
                        <NavLink exact={true} to="/" className={`nav-item`} activeClassName={'is-active'}>
                            Home
                        </NavLink>

                        <NavLink to="/map" className={`nav-item`} activeClassName={'is-active'}>
                            Map
                        </NavLink>

                        <NavLink to="/about" className={`nav-item`} activeClassName={'is-active'}>
                            About
                        </NavLink>

                        {window.Laravel.loggedIn ?
                            <NavLink to="/account" className={`nav-item`} activeClassName={'is-active'}>
                                Account
                            </NavLink>
                            : null}

                        {!window.Laravel.loggedIn ?
                            <a href="/login" className={`nav-item ${Path.isActive('/login')}`}>
                                Login
                            </a>
                            : null}

                        {!window.Laravel.loggedIn ?
                            <a href="/register" className={`nav-item ${Path.isActive('/register')}`}>
                                Register
                            </a>
                            : null}

                        {window.Laravel.isAdmin ?
                            <a href="/admin" className={`nav-item ${Path.isActive('/admin', false)}`}>Admin</a>
                            : null}

                        {window.Laravel.loggedIn ?
                            <a href="/logout" className="nav-item">
                                Logout
                            </a>
                            : null}
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
