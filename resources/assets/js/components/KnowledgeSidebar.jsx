import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class KnowledgeSidebar extends Component {
    render() {
        return (
            <aside className="menu admin-sidebar" role="navigation">
                <p className="menu-heading">Knowledge Base</p>
                <ul className="menu-list">
                    <li>
                        <NavLink to="/about" activeClassName={'is-active'}>
                            <i className="fa fa-address-card-o"></i> About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/trees" activeClassName={'is-active'}>
                            <i className="fa fa-tree"></i> Trees
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/faq" activeClassName={'is-active'}>
                            <i className="fa fa-question-circle-o"></i> FAQ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/privacy-policy" activeClassName={'is-active'}>
                            <i className="fa fa-eye-slash"></i> Privacy Policy
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/terms-of-use" activeClassName={'is-active'}>
                            <i className="fa fa-file-text-o"></i> Terms of Use
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" activeClassName={'is-active'}>
                            <i className="fa fa-envelope-o"></i> Contact Us
                        </NavLink>
                    </li>
                </ul>
            </aside>
        )
    }
}