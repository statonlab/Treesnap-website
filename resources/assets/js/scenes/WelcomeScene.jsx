import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import HomeJumbotron from '../components/HomeJumbotron'
import SubscribeRow from '../components/SubscribeRow'
import FeaturesList from '../components/FeaturesList'
import HomeFooter from '../components/HomeFooter'

export default class Welcome extends Component {
    /**
     * Render the scene.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <div className="home">
                    <Navbar home={true}/>
                    <HomeJumbotron/>
                </div>
                <SubscribeRow/>
                <FeaturesList/>
                <HomeFooter/>
            </div>
        )
    }
}