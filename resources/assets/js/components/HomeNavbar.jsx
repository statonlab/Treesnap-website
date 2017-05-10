import React, {Component} from 'react'
import Path from '../helpers/Path'

export default class NavbarHome extends  Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive  : false,
            isLoggedIn: false,
            isAdmin   : false
        }
    }

    /**
     * Get user logged in status.
     */
    componentDidMount() {
        axios.get('/user/status').then(response => {
            let data = response.data.data
            this.setState({
                isLoggedIn: data.logged_in,
                isAdmin   : data.is_admin
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <nav className="nav home-nav">
                <div className="container is-small">
                    <div className="nav-left">
                        <a href="/" className="nav-item logo">
                            <b>Tree</b><span style={{fontWeight: 300}}>Snap</span>
                        </a>
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

                    <span className="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>

                    <div className="nav-right nav-menu">
                        <a href="/" className="nav-item active">
                            Home
                        </a>

                        <a href="/map" className="nav-item">
                            Submissions Map
                        </a>

                        {!this.state.isLoggedIn ?
                            <a href="/login" className={`nav-item ${Path.isActive('/login')}`}>
                                Login
                            </a>
                            : null}

                        {!this.state.isLoggedIn ?
                            <a href="/register" className={`nav-item ${Path.isActive('/register')}`}>
                                Register
                            </a>
                            : null}

                        {this.state.isLoggedIn ?
                            <a href="/account" className={`nav-item ${Path.isActive('/account')}`}>
                                Account
                            </a>
                            : null}

                        {this.state.isAdmin ?
                            <a href="/admin" className={`nav-item ${Path.isActive('/admin', false)}`}>Admin</a>
                            : null}

                        {this.state.isLoggedIn ?
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