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
      name   : '',
      share  : false,
      errors : {
        share: [],
        name : []
      },
      groups : [],
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
      this.setState({
        groups : data,
        loading: false
      })
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
      <form action="#" onSubmit={this.submit.bind(this)} className="limit-width">
        <div className="field">
          <div className="control is-expanded">
            <input type="text"
                   className={`input${this.state.errors.name.length > 0 ? ' is-danger' : ''}`}
                   value={this.state.name}
                   placeholder="Group Name"
                   onChange={({target}) => this.setState({errors: {name: [], share: []}, name: target.value})}
            />
            {this.state.errors.name.map((error, index) => {
              return (
                <p className="help is-danger" key={index}>
                  {error}
                </p>
              )
            })}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox"
                     className={'mr-0'}
                     onChange={({target}) => this.setState({share: target.checked})}
                     checked={this.state.share}/>
              Share all of my observations with members of this group including accurate location coordinates
            </label>
          </div>
          {this.state.errors.share.map((error, index) => {
            return (
              <p className="help is-danger" key={index}>
                {error}
              </p>
            )
          })}
        </div>

        <div className="field">
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
      name : this.state.name,
      share: this.state.share
    }).then(response => {
      let data   = response.data.data
      let groups = this.state.groups
      groups.push(data)
      this.setState({
        name  : '',
        groups,
        errors: {
          name : [],
          share: []
        }
      })
      Notify.push('Group created successfully.')
      EventEmitter.emit('user.groups.updated')
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        let errors = error.response.data
        this.setState({
          errors: {
            name : errors.name || [],
            share: errors.share || []
          }
        })
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
          <h2 className="title is-4">Create New Group</h2>
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