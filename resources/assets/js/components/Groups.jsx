import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Notify from './Notify'
import EventEmitter from '../helpers/EventEmitter'

export default class Groups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups : [],
      name   : '',
      errors : [],
      success: false,
      loading: false
    }

    document.title = 'Groups - TreeSnap'
  }

  /**
   * Get groups from server.
   */
  componentWillMount() {
    this.setState({loading: true})
    axios.get('/web/groups').then(response => {
      let data = response.data.data
      this.setState({groups: data, loading: false})
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
      return (
        <div>
          <p>There are no available groups yet. You can create a group using the form below.</p>
          <p>If someone else invites you to join their group, the group will show up here once you accept the invitation.</p>
        </div>
      )
    }

    const admin = this.props.admin

    return (
      <table className="table is-striped mb-none" id="groups-table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Users</th>
          <th>Leader</th>
          <th>Date Created</th>
        </tr>
        </thead>
        <tbody>
        {this.state.groups.map((group, index) => {
          return (
            <tr key={index}>
              <td><Link to={`${!admin ? '/account' : ''}/group/${group.id}`}>{group.name}</Link></td>
              <td>{group.users_count}</td>
              <td>{group.owner.name}</td>
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
        <div className="field has-addons limit-width">
          <div className="control is-expanded">
            <input type="text"
                   className={`input ${this.state.errors.length > 0 && 'is-danger'}`}
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
          <div className="control">
            <button type="submit" className="button is-primary">Create Group</button>
          </div>
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
    axios.post('/web/groups', {
      name: this.state.name
    }).then(response => {
      let data   = response.data.data
      let groups = this.state.groups
      groups.push(data)
      this.setState({name: '', groups})
      Notify.push('Group created successfully.')
      EventEmitter.emit('user.groups.updated')
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
          {this._renderForm()}
        </div>
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}

Groups.PropTypes = {
  admin: PropTypes.bool
}

Groups.defaultProps = {
  admin: true
}