import React, {Component} from 'react'
import Spinner from '../../components/Spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'

export default class GroupsScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups : [],
            name   : '',
            errors : [],
            success: false,
            loading: false
        }
    }

    /**
     * Get groups from server.
     */
    componentWillMount() {
        this.setState({loading: true})
        axios.get('/admin/api/groups').then(response => {
            this.setState({groups: response.data.data, loading: false})
        }).catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }

    /**
     * Render groups table.
     *
     * @returns {XML}
     * @private
     */
    _renderGroupsTable() {
        if (this.state.groups.length === 0) {
            return (<p>There are no available groups yet. You can add one using the form below.</p>)
        }

        return (
            <table className="table is-striped mb-none" id="groups-table">
                <thead>
                <tr>
                    <th style={{width: '50px'}}>ID</th>
                    <th>Name</th>
                    <th># Users</th>
                    <th>Date Created</th>
                </tr>
                </thead>
                <tbody>
                {this.state.groups.map((group, index) => {
                    return (
                        <tr key={index}>
                            <td>{group.id}</td>
                            <td><Link to={`/group/${group.id}`}>{group.name}</Link></td>
                            <td>{group.users}</td>
                            <td>{moment(group.created_at).format('MMM Do, YYYY')}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    /**
     * Render add group form.
     *
     * @returns {XML}
     * @private
     */
    _renderForm() {
        return (
            <form action="#" onSubmit={this.submit.bind(this)}>
                <div className="field">
                    <label className="label">Group Name</label>
                    <div className="control">
                        <input type="text"
                               className={`input limit-width ${this.state.errors.length > 0 && 'is-danger'}`}
                               value={this.state.name}
                               placeholder="Group Name"
                               onChange={e => {
                                   this.setState({
                                       errors: [],
                                       name  : e.target.value
                                   })
                               }}
                        />
                        {this.state.errors.map((error, index) => {
                            return (
                                <p className="help is-danger" key={index}>
                                    {error}
                                </p>
                            )
                        })}
                    </div>
                </div>

                <div className="box-footer">
                    <button type="submit" className="button is-primary">Create Group</button>
                </div>
            </form>
        )
    }

    /**
     * Handle submit button.
     *
     * @param e
     */
    submit(e) {
        e.preventDefault()
        axios.post('/admin/api/groups', {
            name: this.state.name
        }).then(response => {
            let data   = response.data.data
            data.users = 0
            let groups = this.state.groups
            groups.push(data)
            this.setState({name: '', groups, success: true})
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                this.setState({errors: error.response.data.name})
            }
        })
    }

    render() {
        return (
            <div>
                <h1 className="title is-3">User Groups</h1>
                <div className="box">
                    <h4 className="title is-4">Groups</h4>
                    {this._renderGroupsTable()}
                </div>

                <div className="box">
                    <h4 className="title is-4">Add Group</h4>
                    {this._renderForm()}
                </div>
                <Spinner visible={this.state.loading}/>
            </div>
        )
    }
}