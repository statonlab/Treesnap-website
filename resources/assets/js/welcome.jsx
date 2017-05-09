/**
 * Treesnap Welcome splash screen
 */
import ReactDOM from 'react-dom'
import React, {Component} from 'react'
import HomeNavbar from './components/HomeNavbar'
import HomeJumbotron from './components/HomeJumbotron'
import SubscribeRow from './components/SubscribeRow'


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
                    <HomeNavbar/>
                    <HomeJumbotron/>
                </div>
                <SubscribeRow/>
            </div>
        )
    }
}

ReactDOM.render(<Welcome/>, document.getElementById('welcome'))