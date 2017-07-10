import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Path from '../helpers/Path'

export default class AdminNavbar extends Component {
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
        axios.get('/web/user/status').then(response => {
            let data = response.data.data
            this.setState({
                isLoggedIn: data.logged_in,
                isAdmin   : data.is_admin
            })
        }).catch(error => {
            console.log(error)
        })
    }

    toggle() {
        this.setState({isActive: !this.state.isActive})
    }

    render() {
        return (
            <div>
                <nav className="nav">
                    <div className={this.props.container ? 'container' : 'container is-fluid'}>
                        <div className="nav-left nav-brand">
                            <a href="/" className="nav-item">
                                <img src={`/logo/ts-logo-${this.props.home ? '96' : '32'}.png`} alt="Logo" className="logo-img"/>
                                <span className="logo-text"><b>Tree</b><span style={{fontWeight: 300}}>Snap</span></span>
                            </a>
                        </div>

                        <div className="nav-toggle" onClick={this.toggle.bind(this)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div className={`nav-right nav-menu${this.state.isActive ? ' is-active' : ''}`}>
                            <a href="/" className={`nav-item ${Path.isActive('/')}`}>
                                Home
                            </a>

                            <a href="/map" className={`nav-item ${Path.isActive('/map')}`}>
                                Map
                            </a>

                            <a href="/about" className={`nav-item ${Path.isActive('/about')}`}>
                                About
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
                                <a href="/account" className="nav-item">
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
            </div>
        )
    }
}

AdminNavbar.PropTypes = {
    container: PropTypes.bool
}

AdminNavbar.defaultProps = {
    container: false
}
