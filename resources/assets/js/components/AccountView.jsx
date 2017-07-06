import React, {Component} from 'react'
import AccountLinks from '../helpers/AccountLinks'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import LinksSidebar from '../components/LinksSidebar'

export default class AccountView extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="home-section short-content">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-narrow account-sidebar-container">
                                <LinksSidebar links={AccountLinks} title="Members"/>
                            </div>
                            <div className="column">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </div>
        )
    }
}