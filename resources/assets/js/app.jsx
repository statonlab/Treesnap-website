/**
 * TreeSnap Website Entry Point JS File
 */
// Bootstrap Everything (loads dash and a configured axios)
import './bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import PageLoader from './helpers/PageLoader'

const WelcomeScene = Loadable({
  loader: () => import('./scenes/WelcomeScene'),
  loading: PageLoader
})

const AccountScene = Loadable({
  loader: () => import('./scenes/AccountScene'),
  loading: PageLoader
})

const ObservationScene = Loadable({
  loader: () => import('./scenes/ObservationScene'),
  loading: PageLoader
})

const MapScene = Loadable({
  loader: () => import('./scenes/MapScene'),
  loading: PageLoader
})

const ContactUsScene = Loadable({
  loader: () => import('./scenes/ContactUsScene'),
  loading: PageLoader
})

const NotFoundScene = Loadable({
  loader: () => import('./scenes/NotFoundScene'),
  loading: PageLoader
})

const KnowledgeScene = Loadable({
  loader: () => import('./scenes/KnowledgeScene'),
  loading: PageLoader
})

const KnowledgeViewScene = Loadable({
  loader: () => import('./scenes/KnowledgeViewScene'),
  loading: PageLoader
})

const MyObservationsScene = Loadable({
  loader: () => import('./scenes/MyObservationsScene'),
  loading: PageLoader
})

const AccountCollectionsScene = Loadable({
  loader: () => import('./scenes/AccountCollectionsScene'),
  loading: PageLoader
})

const AccountFiltersScene = Loadable({
  loader: () => import('./scenes/AccountFiltersScene'),
  loading: PageLoader
})

const GroupScene = Loadable({
  loader: () => import('./scenes/GroupScene'),
  loading: PageLoader
})

const GroupsScene = Loadable({
  loader: () => import('./scenes/GroupsScene'),
  loading: PageLoader
})

const DeveloperScene = Loadable({
  loader: () => import('./scenes/DeveloperScene'),
  loading: PageLoader
})

const ScientificSamplingScene = Loadable({
  loader: () => import('./scenes/ScientificSamplingScene'),
  loading: PageLoader
})

const SamplingProjectScene = Loadable({
  loader: () => import('./scenes/SamplingProjectScene'),
  loading: PageLoader
})

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path={'/'} component={WelcomeScene}/>
          <Route exact={true} path={'/account'} component={AccountScene}/>
          <Route exact={true} path={'/scientific-sampling'} component={ScientificSamplingScene}/>
          <Route exact={true} path={'/scientific-sampling/:id'} component={SamplingProjectScene}/>
          <Route exact={true} path={'/account/observations'} component={MyObservationsScene}/>
          <Route exact={true} path={'/account/collections'} component={AccountCollectionsScene}/>
          <Route exact={true} path={'/account/filters'} component={AccountFiltersScene}/>
          <Route exact={true} path={'/account/groups'} component={GroupsScene}/>
          <Route exact={true} path={'/account/group/:id'} component={GroupScene}/>
          <Route path={'/observation/:id'} component={ObservationScene}/>
          <Route path={'/map'} component={MapScene}/>
          <Route path={'/contact'} component={ContactUsScene}/>
          <Route path={'/developer'} component={DeveloperScene}/>
          <Route path={'/about'}
                 component={() =>
                   <KnowledgeViewScene title="About Us"/>
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
                   <KnowledgeViewScene title="Partners"/>
                 }/>
          <Route component={NotFoundScene}/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app-root'))
