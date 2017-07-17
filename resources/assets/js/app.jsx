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
import MyObservationsScene from './scenes/MyObservationsScene'
import AccountCollectionsScene from './scenes/AccountCollectionsScene'
import AccountFiltersScene from './scenes/AccountFiltersScene'
import GroupScene from './scenes/GroupScene'
import GroupsScene from './scenes/GroupsScene'

class App extends Component {
    render() {
        return (
            <Router history={'browser'}>
                <Switch>
                    <Route exact={true} path={'/'} component={WelcomeScene}/>
                    <Route exact={true} path={'/account'} component={AccountScene}/>
                    <Route exact={true} path={'/account/observations'} component={MyObservationsScene}/>
                    <Route exact={true} path={'/account/collections'} component={AccountCollectionsScene}/>
                    <Route exact={true} path={'/account/filters'} component={AccountFiltersScene}/>
                    <Route exact={true} path={'/account/groups'} component={GroupsScene}/>
                    <Route exact={true} path={'/account/group/:id'} component={GroupScene}/>
                    <Route path={'/observation/:id'} component={ObservationScene}/>
                    <Route path={'/map'} component={MapScene}/>
                    <Route path={'/contact'} component={ContactUsScene}/>
                    <Route path={'/about'}
                           component={() =>
                               <KnowledgeScene docPath='/web/docs/about' title="About Us"/>
                           }/>
                    <Route path={'/privacy-policy'}
                           component={() =>
                               <KnowledgeScene docPath='/web/docs/privacy' title="Privacy Policy"/>
                           }/>
                    <Route path={'/terms-of-use'}
                           component={() =>
                               <KnowledgeScene docPath='/web/docs/terms' title="Terms of Use"/>
                           }/>
                    <Route path={'/faq'}
                           component={() => (
                               <KnowledgeScene docPath='/web/docs/faq' title="Frequently Asked Questions"/>)
                           }/>
                    <Route path={'/trees'}
                           component={() =>
                               <KnowledgeScene docPath='/web/docs/trees' title="Trees"/>
                           }/>
                    <Route path={'/partners'}
                           component={() =>
                               <KnowledgeScene docPath='/web/docs/partners' title="Partners"/>
                           }/>
                    <Route component={NotFoundScene}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app-root'))