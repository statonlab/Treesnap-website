import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Notify from './Notify'
import EventEmitter from '../helpers/EventEmitter'
import GroupSearchForm from './GroupSearchForm'

export default class Groups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      share: false,
      isPrivate: 0,
      errors: {
        share: [],
        name: [],
        isPrivate: []
      },
      groups: [],
      invitations: [],
      acceptingInvitation: -1,
      success: false,
      loading: true
    }

    document.title = 'Groups - TreeSnap'
  }

  /**
   * Get groups from server.
   */
  async componentDidMount() {
    await this.loadGroupsAndInvitations()
  }

  async loadGroupsAndInvitations() {
    this.setState({loading: true})
    try {
      // Make first two requests
      let response = await Promise.all([
        axios.get('/web/groups'),
        axios.get('/web/invitations')
      ]);

      let groups = response[0].data.data
      let invitations = response[1].data.data

      // Update state once with all 3 responses
      this.setState({
        groups: groups,
        invitations: invitations,
        loading: false,
        acceptingInvitation: -1
      });
    } catch (error) {
      console.log(error)
      this.setState({loading: false})
    }
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
          <p>If someone else invites you to join their group, the group will show up here once you accept the
            invitation.</p>
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
              <td>
                <Link to={`${!admin ? '/account' : ''}/group/${group.id}`}>
                  {group.name} {group.owner.name === 'You' && group.group_requests_count > 0 ?
                  <i className="tag is-success">{group.group_requests_count} pending requests</i>
                  : null}
                </Link>
              </td>
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
   * Renders invitations table.
   * @returns {JSX.Element}
   * @private
   */
  _renderInvitationsTable() {
    if (this.state.invitations.length === 0) {
      return (
        <div>
          <p>You have no pending invitations.</p>
        </div>
      )
    }

    return (
      <table className="table is-striped mb-none" id="groups-table">
        <thead>
        <tr>
          <th>Group Name</th>
          <th>Group Owner</th>
          {/*<th>Invited By</th>*/}
          <th>Invited By</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {this.state.invitations.map((invitation, index) => {
          return (
            <tr key={index}>
              <td>
                {invitation.group.name}
              </td>
              <td>{invitation.group.owner.name}</td>
              <td>{invitation.user.name}</td>
              <td className="has-text-right">
                <button type="button"
                        className={`button is-primary is-outlined ${this.state.loading ? ' disabled' : ''}`}
                        disabled={this.state.loading && this.state.acceptingInvitation !== invitation.group.id}
                        onClick={() => this.acceptInvite(invitation)}>
                  {'Accept Invite'}
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }

  acceptInvite(invitation) {
    // Prevent multiple requests
    if (this.state.acceptingInvitation !== -1) {
      return
    }

    this.setState({
      acceptingInvitation: invitation.id,
      loading: true
    })

    axios.post(`/web/invitations/accept`, {
      // params: {
      invite: invitation.id,
        _t: invitation.token
      // }
    }).then(async () => {
      Notify.push(`You have joined ${invitation.group.name} successfully.`)
      await this.loadGroupsAndInvitations()
    }).catch(error => {
      this.setState({
        acceptingInvitation: -1,
        loading: false
      })

      if (!error.response) {
        Notify.push('Network error! Please try again later', 'danger')
        return
      }

      let response = error.response

      console.error(response)
    })
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
          <div className="control is-expanded">
            <input type="text"
                   className={`limit-width input${this.state.errors.name.length > 0 ? ' is-danger' : ''}`}
                   value={this.state.name}
                   placeholder="Group Name"
                   onChange={({target}) => this.setState({name: target.value})}
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
          <label className="label">Discoverability</label>
          <div className="control is-expanded">
            <span className="select">
              <select value={this.state.isPrivate}
                      onChange={({target}) => this.setState({isPrivate: parseInt(target.value)})}>
                <option value={1}>Users must be invited to join</option>
                <option value={0}>Allow anyone to find this group and apply to join</option>
              </select>
            </span>
            {this.state.errors.isPrivate.map((error, index) => {
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
              <span>
                Share all of my observations with members of this group including accurate location coordinates
              </span>
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
      name: this.state.name,
      share: this.state.share,
      is_private: this.state.isPrivate === 1
    }).then(response => {
      let data = response.data.data
      let groups = this.state.groups
      groups.push(data)
      this.setState({
        name: '',
        groups,
        errors: {
          name: [],
          share: [],
          isPrivate: []
        }
      })
      Notify.push('Group created successfully.')
      EventEmitter.emit('user.groups.updated')
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        let errors = error.response.data
        this.setState({
          errors: {
            name: errors.name || [],
            share: errors.share || [],
            isPrivate: errors.is_private || []
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
          <h4 className='title is-4 mt-2'>Invitations</h4>
          {this._renderInvitationsTable()}
        </div>

        <div className="columns is-multiline">
          <div className="column is-12-tablet is-6-desktop is-6-fullhd">
            <div className="box">
              <h2 className="title is-4">Create New Group</h2>
              {this._renderForm()}
            </div>
          </div>
          <div className="column is-12-tablet is-6-desktop is-6-fullhd">
            <div className="box">
              <h2 className="title is-4">Join a Group</h2>
              <p className="mb-1">Search and apply to join public groups</p>
              <GroupSearchForm></GroupSearchForm>
            </div>
          </div>
        </div>
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}

Groups.propTypes = {
  admin: PropTypes.bool
}

Groups.defaultProps = {
  admin: true
}
