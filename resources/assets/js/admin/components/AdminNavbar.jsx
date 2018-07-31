import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Path from '../../helpers/Path'
import User from '../../helpers/User'

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
        isAdmin   : data.is_admin || User.scientist()
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
        <nav className="navbar">
          <div className={this.props.container ? 'container' : 'container is-fluid'}>
            <div className="navbar-brand">
              <a href="/" className="navbar-item">
                <img src={`/logo/ts-logo-${this.props.home ? '96' : '32'}.png`}
                     alt="Logo"
                     className="logo-img"/>
                <span className="logo-text"><b>Tree</b><span style={{fontWeight: 300}}>Snap</span></span>
              </a>

              <div className="navbar-burger" onClick={this.toggle.bind(this)}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className={`navbar-menu${this.state.isActive ? ' is-active' : ''}`}>
              <div className="navbar-end">
                <a href="/" className={`navbar-item ${Path.isActive('/')}`}>
                  Home
                </a>

                <a href="/map" className={`navbar-item ${Path.isActive('/map')}`}>
                  Map
                </a>

                <a href="/about" className={`navbar-item ${Path.isActive('/about')}`}>
                  About
                </a>

                {!this.state.isLoggedIn ?
                  <a href="/login" className={`navbar-item ${Path.isActive('/login')}`}>
                    Login
                  </a>
                  : null}

                {!this.state.isLoggedIn ?
                  <a href="/register" className={`navbar-item ${Path.isActive('/register')}`}>
                    Register
                  </a>
                  : null}

                {this.state.isLoggedIn ?
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a href="/account" className={`navbar-link`}>
                      Account
                    </a>
                    <div className="navbar-dropdown">
                      <a href="/account/observations" className={`navbar-item`}>
                        My Observations
                      </a>
                      <a href="/account/collections" className={`navbar-item`}>
                        Collections
                      </a>
                      <a href="/account/filters" className={`navbar-item`}>
                        Filters
                      </a>
                      <hr className="navbar-divider"/>
                      <a href="/account" className={`navbar-item`}>
                        Settings
                      </a>
                      <a href="/logout" className="navbar-item">
                        Logout
                      </a>
                    </div>
                  </div>
                  : null}

                {User.can('access admin pages') ?
                  <a href="/admin"
                     className={`navbar-item ${Path.isActive('/admin', false)}`}>Admin</a>
                  : null}
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

AdminNavbar.propTypes = {
  container: PropTypes.bool
}

AdminNavbar.defaultProps = {
  container: false
}
