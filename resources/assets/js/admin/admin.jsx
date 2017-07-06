import '../bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'
import DashboardScene from './scenes/DashboardScene'
import UsersScene from './scenes/UsersScene'
import UserScene from './scenes/UserScene'
import GroupsScene from './scenes/GroupsScene'
import GroupScene from './scenes/GroupScene'
import ObservationsScene from './scenes/ObservationsScene'
import CurateScene from './scenes/CurateScene'
import FiltersScene from '../scenes/FiltersScene'
import CollectionsScene from '../scenes/CollectionsScene'

class Admin extends Component {
    render() {
        return (
            <div>
                <AdminNavbar />
                <Router basename="/admin" onChange={() => alert('changed')}>
                    <div className="main-content admin-content">
                        <div className="container is-fluid">
                            <div className="columns">
                                <div className="column is-narrow admin-sidebar">
                                    <AdminSidebar/>
                                </div>
                                <div className="column">
                                    <Switch>
                                        <Route exact={true} path="/" component={DashboardScene}/>
                                        {window.Laravel.isScientist ? null
                                            : <Route path="/users" component={UsersScene}/>
                                        }
                                        {window.Laravel.isScientist ? null
                                            : <Route path="/user/:id" component={UserScene}/>
                                        }
                                        <Route path="/groups" component={GroupsScene}/>
                                        <Route path="/group/:id" component={GroupScene}/>
                                        <Route path="/filters" component={FiltersScene}/>
                                        <Route path="/observations" component={ObservationsScene}/>
                                        <Route path="/collections" component={CollectionsScene}/>
                                        <Route path="/curate" component={CurateScene}/>
                                        <Route render={() => {
                                            window.location.replace('/no-match')
                                            return null
                                        }}/>
                                    </Switch>
                                    <div className="app-footer admin-footer">
                                        Copyright &copy; 2017 University of Tennessee at Knoxville
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

ReactDOM.render(<Admin />, document.getElementById('app'))