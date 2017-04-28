import '../bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar'
import Navbar from '../components/Navbar'
import Dashboard from './scenes/Dashboard'
import Users from './scenes/Users'
import User from './scenes/User'
import Groups from './scenes/Groups'
import Group from './scenes/Group'

class Admin extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Router basename="/admin">
                    <div className="main-content admin-content">
                        <div className="container is-fluid">
                            <div className="columns">
                                <div className="column is-2 admin-sidebar">
                                    <AdminSidebar/>
                                </div>
                                <div className="column is-10">
                                    HERE is MY TEXT
                                    <Route exact={true} path="/" component={Dashboard}/>
                                    <Route path="/users" component={Users}/>
                                    <Route path="/user/:id" component={User}/>
                                    <Route path="/groups" component={Groups}/>
                                    <Route path="/group/:id" component={Group}/>
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