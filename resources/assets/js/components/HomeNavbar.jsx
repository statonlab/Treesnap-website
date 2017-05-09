import React, {Component} from 'react'

export default class NavbarHome extends  Component {
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

                        <a href="/register" className="nav-item">
                            Register
                        </a>

                        <a href="/login" className="nav-item">
                            Login
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}