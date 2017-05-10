/**
 * Treesnap Website Entry Point JS File
 */
// Bootstrap Everything (loads dash and a configured axios)
import './bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import WelcomeScene from './scenes/WelcomeScene'
import AccountScene from './scenes/AccountScene'
import ObservationScene from './scenes/ObservationScene'
import MapScene from './scenes/MapScene'
import PolicyScene from './scenes/PolicyScene'
import AboutScene from './scenes/AboutScene'
import ContactUsScene from './scenes/ContactUsScene'

class App extends Component {
    render() {
        return (
            <Router history={'browser'}>
                <div>
                    <Route exact={true} path={'/'} component={WelcomeScene}/>
                    <Route path={'/account'} component={AccountScene}/>
                    <Route path={'/observation/:id'} component={ObservationScene}/>
                    <Route path={'/map'} component={MapScene}/>
                    <Route path={'/about'} component={AboutScene}/>
                    <Route path={'/privacy'} component={PolicyScene}/>
                    <Route path={'/contact'} component={ContactUsScene}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app-root'))