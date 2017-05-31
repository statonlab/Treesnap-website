/**
 * TreeSnap Website Entry Point JS File
 */
// Bootstrap Everything (loads dash and a configured axios)
import './bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import WelcomeScene from './scenes/WelcomeScene'
import AccountScene from './scenes/AccountScene'
import ObservationScene from './scenes/ObservationScene'
import MapScene from './scenes/MapScene'
import ContactUsScene from './scenes/ContactUsScene'
import NotFoundScene from './scenes/NotFoundScene'
import KnowledgeScene from './scenes/KnowledgeScene'

class App extends Component {
    render() {
        return (
            <Router history={'browser'}>
                <Switch>
                    <Route exact={true} path={'/'} component={WelcomeScene}/>
                    <Route path={'/account'} component={AccountScene}/>
                    <Route path={'/observation/:id'} component={ObservationScene}/>
                    <Route path={'/map'} component={MapScene}/>
                    <Route path={'/contact'} component={ContactUsScene}/>
                    <Route path={'/about'} component={() => (<KnowledgeScene docPath='/docs/about'/>) }/>
                    <Route path={'/privacy-policy'} component={() => (<KnowledgeScene docPath='/docs/privacy'/>)}/>
                    <Route path={'/terms-of-use'} component={() => (<KnowledgeScene docPath='/docs/terms'/>)}/>
                    <Route path={'/faq'} component={() => (<KnowledgeScene docPath='/docs/faq'/>)}/>
                    <Route component={NotFoundScene}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app-root'))