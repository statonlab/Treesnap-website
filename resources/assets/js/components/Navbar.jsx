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
                <nav className={`nav`}>
                    <div className="nav-left">
                        <a className="nav-item" style={{fontSize: '1.2em', color: '#444'}}>
                            <b style={{color: '#2A9D8F', fontWeight: '700'}}>Tree</b>Source
                        </a>
                        <small className="nav-item" style={{color: '#888', fontSize: '14px'}}>
                            Citizen science app
                        </small>
                    </div>

                    <div className="nav-toggle" onClick={this.toggle.bind(this)} style={{height: '60px'}}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={`nav-right nav-menu${this.state.isActive ? ' is-active' : ''}`}>
                        <a className="nav-item">
                            Home
                        </a>
                        <a className="nav-item">
                            Documentation
                        </a>
                        <a className="nav-item">
                            About
                        </a>

                        <div className="nav-item">
                            <a className="button" onClick={() => this.modal.open()}>
                                <span>Login</span>
                            </a>
                            <a className="button is-primary">
                                <span>Register</span>
                            </a>
                        </div>
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
