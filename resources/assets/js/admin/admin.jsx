import '../bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import User from '../helpers/User'
import Loadable from 'react-loadable'
import AdminSidebar from './components/AdminSidebar'
import AdminNavbar from './components/AdminNavbar'
import PageLoader from '../helpers/PageLoader'

const DashboardScene = Loadable({
  loader : () => import('./scenes/DashboardScene'),
  loading: PageLoader
})

const UsersScene = Loadable({
  loader : () => import('./scenes/UsersScene'),
  loading: PageLoader
})

const UserScene = Loadable({
  loader : () => import('./scenes/UserScene'),
  loading: PageLoader
})

const Groups = Loadable({
  loader : () => import('../components/Groups'),
  loading: PageLoader
})

const Group = Loadable({
  loader : () => import('../components/Group'),
  loading: PageLoader
})

const ObservationsScene = Loadable({
  loader : () => import('./scenes/ObservationsScene'),
  loading: PageLoader
})

const CurateScene = Loadable({
  loader : () => import('./scenes/CurateScene'),
  loading: PageLoader
})

const FiltersScene = Loadable({
  loader : () => import('../scenes/FiltersScene'),
  loading: PageLoader
})

const CollectionsScene = Loadable({
  loader : () => import('../scenes/CollectionsScene'),
  loading: PageLoader
})

const ObservationScene = Loadable({
  loader : () => import('../scenes/ObservationScene'),
  loading: PageLoader
})

const EventsScene = Loadable({
  loader : () => import('./scenes/EventsScene'),
  loading: PageLoader
})

class Admin extends Component {
  render() {
    return (
      <div>
        <AdminNavbar/>
        <Router basename="/admin">
          <div className="main-content admin-content">
            <div className="container is-fluid">
              <div className="columns">
                <div className="column is-narrow admin-sidebar">
                  <AdminSidebar/>
                </div>
                <div className="column">
                  <Switch>
                    <Route exact={true} path="/" component={DashboardScene}/>
                    {User.can('manage events') ?
                      <Route path="/events" component={EventsScene}/>
                      : null}
                    {/*{User.can('manage events') ?*/}
                      {/*<Route path="/event/:id" component={EventScene}/>*/}
                      {/*: null}*/}
                    {User.scientist() ? null
                      : <Route path="/users" component={UsersScene}/>
                    }
                    {User.scientist() ? null
                      : <Route path="/user/:id" component={UserScene}/>
                    }
                    <Route path="/groups" render={props => <Groups admin={true} {...props}/>}/>
                    <Route path="/group/:id" render={props => <Group admin={true} {...props}/>}/>
                    <Route path="/filters" component={FiltersScene}/>
                    <Route path="/observations" component={ObservationsScene}/>
                    <Route path="/collections"
                           render={props => <CollectionsScene admin={true} {...props}/>}/>
                    <Route path="/curate" component={CurateScene}/>
                    <Route path="/observation/:id"
                           render={props => <ObservationScene admin={true} {...props}/>}/>
                    <Route render={() => {
                      window.location.replace('/no-match')
                      return null
                    }}/>
                  </Switch>
                  <div className="app-footer admin-footer is-flex flex-space-between">
                    <div>
                      Copyright &copy; {new Date().getFullYear()}&nbsp;
                      <b><a href="https://utk.edu">University of Tennessee at Knoxville</a></b>
                    </div>
                    <div>
                      <a href="/privacy-policy">Privacy Policy</a> |
                      <a href="/terms-of-use">Terms of Use</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<Admin/>, document.getElementById('app'))
