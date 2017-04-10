import React, {Component, PropTypes} from 'react'
import Modal from './Modal'

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            isActive: false
        }
    }

    close() {
        this.setState({open: false})
    }

    toggle() {
        this.setState({isActive: !this.state.isActive})
    }

    render() {
        return (
            <div>
                <nav className="nav">
                    <div className="nav-left nav-brand">
                        <a href="/" className="nav-item">
                            <b>Tree</b>Source
                        </a>
                        <small className="nav-item">
                            Citizen science app
                        </small>
                    </div>

                    <div className="nav-toggle" onClick={this.toggle.bind(this)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={`nav-right nav-menu${this.state.isActive ? ' is-active' : ''}`}>
                        <a href="/" className="nav-item">
                            Home
                        </a>
                        <a href="#" className="nav-item">
                            Help
                        </a>
                        <a href="#" className="nav-item" onClick={(e) => {
                            e.preventDefault()
                            this.modal.open('about')
                        }}>
                            About
                        </a>

                        {!Laravel.loggedIn ?
                        <a href="/login" className="nav-item">
                            Login
                        </a>
                        : null}

                        {!Laravel.loggedIn ?
                        <a href="/register" className="nav-item">
                            Register
                        </a>
                        : null }

                        {Laravel.loggedIn ?
                        <a href="/register" className="nav-item">
                            Account
                        </a>
                        : null}
                    </div>
                </nav>
                <Modal ref={modal => this.modal = modal}/>
            </div>
        )
    }
}

Navbar.PropTypes = {
    name: PropTypes.string.isRequired
}
