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
                        <a className="nav-item">
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
                        <a className="nav-item">
                            Home
                        </a>
                        <a className="nav-item">
                            Help
                        </a>
                        <a className="nav-item">
                            About
                        </a>

                        <a href="#" className="nav-item" onClick={(e) => {
                            e.preventDefault();
                            this.modal.open()
                        }}>
                            Login
                        </a>

                        <a href="/register" className="nav-item">
                            Register
                        </a>
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
