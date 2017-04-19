import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Select from 'react-select'

export default class Group extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name       : '',
            users      : [],
            loading    : true,
            form_users : [],
            form_errors: []
        }
    }

    /**
     * Get group info and users upon mounting
     */
    componentWillMount() {
        this.getGroup()
    }

    /**
     * Get group info and users
     */
    getGroup() {
        axios.get(`/admin/api/group/${this.props.match.params.id}`).then(response => {
            let data = response.data.data

            this.setState({
                name : data.name,
                users: data.users
            })
        }).catch(error => {
            console.log(error.response)
        }).then(() => {
            this.setState({loading: false})
        })
    }

    /**
     * Get users who currently don't to join this group
     * @param term
     */
    getUsers(term) {
        let id = this.props.match.params.id

        return axios.get(`/admin/api/group/allowed/users/${id}`, {
            params: {
                term
            }
        }).then(response => {
            let users = []

            response.data.data.map(user => {
                users.push({
                    label: user.name,
                    value: user.id
                })
            })

            return {options: users}
        }).catch(error => {
            console.log(error)
        })
    }

    /**
     * Remove user from group.
     *
     * @param user
     * @private
     */
    _handleDetach(user) {
        let confirm = window.confirm(`Are you sure you want to remove ${user.name} from this group?`)
        if (!confirm) {
            return
        }

        axios.delete(`/admin/api/group/detach`, {
            params: {
                user_id : user.id,
                group_id: this.props.match.params.id
            }
        }).then(response => {
            this.getGroup()
        }).catch(error => {
            error.response && alert(error.response.data)
        })
    }

    /**
     * Render table.
     *
     * @returns {XML}
     * @private
     */
    _renderUsersTable() {
        if (this.state.users.length === 0) {
            return (<p>This group has no users.</p>)
        }

        return (
            <table className="table is-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th className="has-text-right">Remove from Group</th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
                            <td className="has-text-right">
                                <button className="button is-danger is-small"
                                        onClick={() => this._handleDetach.call(this, user)}>
                                    <i className="fa fa-times"></i></button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    /**
     * Render add users form.
     *
     * @returns {XML}
     * @private
     */
    _renderForm() {
        return (
            <form action="#" onSubmit={this.addUser.bind(this)}>
                <div className="field">
                    <Select.Async loadOptions={this.getUsers.bind(this)}
                                  multi={true}
                                  value={this.state.form_users}
                                  onChange={(value) => {
                                      this.setState({form_users: value})
                                  }}/>
                </div>
                <div className="box-footer">
                    <button type="submit" className="button is-primary">Add Users</button>
                </div>
            </form>
        )
    }

    /**
     * Add users to the group.
     *
     * @param e
     */
    addUser(e) {
        e.preventDefault()
        let id    = this.props.match.params.id
        let users = []
        this.state.form_users.map(user => {
            users.push(user.value)
        })

        axios.post(`/admin/api/group/attach`, {
            users   : JSON.stringify(users),
            group_id: id
        }).then(response => {
            this.setState({form_errors: [], form_users: []})
            this.getGroup()
        }).catch(error => {
            error.response && this._handleErrors(error.response.data)
        })
    }

    /**
     * Handle errors returned from server.
     *
     * @param errors
     * @private
     */
    _handleErrors(errors) {
        let form_errors = []
        Object.keys(errors).map(error => {
            error.map(value => form_errors.push(value))
        })

        this.setState({form_errors})
    }

    /**
     * Renders form errors if any exist in an alert.
     *
     * @returns {*}
     * @private
     */
    _renderFormErrors() {
        if (this.state.form_errors.length === 0) {
            return null
        }
        return (
            <div className="alert is-danger">
                {this.state.form_errors.map((error, index) => {
                    return (
                        <p key={index}>{error}</p>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1 className="title is-3">{this.state.name}</h1>

                <div className="box">
                    <h4 className="title is-4">Users</h4>

                    {this._renderUsersTable()}
                </div>

                <div className="box">
                    <h4 className="title is-4">Add Users to Group</h4>
                    {this._renderFormErrors()}
                    {this._renderForm()}
                </div>
                <Spinner visible={this.state.loading}/>
            </div>
        )
    }
}