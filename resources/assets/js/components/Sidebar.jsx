import React, {Component, PropTypes} from 'react'
import SidebarItem from './SidebarItem'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="sidebar">
                <form action="#" method="get" className="mb-1">
                    <p className="mb-0 text-underline">
                        <strong>Search</strong>
                    </p>
                    <div className="field has-addons">
                        <p className="control flex-grow">
                            <input className="input" type="search" placeholder="Search"/>
                        </p>
                        <p className="control">
                            <button type="submit" className="button is-primary">
                                <i className="fa fa-search"></i>
                            </button>
                        </p>
                    </div>
                </form>

                {this.props.children}
            </div>
        )
    }
}

Sidebar.PropTypes = {
    name: PropTypes.string.isRequired
}