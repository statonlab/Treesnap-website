import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Spinner from './Spinner'
import BoxModal from './BoxModal'
import Notify from './Notify'
import moment from 'moment'
import Utils from '../helpers/Utils'
import ObservationCard from '../components/ObservationCard'
import Path from '../helpers/Path'
import User from '../helpers/User'
import EventEmitter from '../helpers/EventEmitter'
import GroupJoinRequests from './GroupJoinRequests'

export default class Group extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name              : '',
      isSharing         : false,
      users             : [],
      loading           : true,
      pageLoading       : true,
      formUsers         : [],
      formErrors        : [],
      isOwner           : false,
      leader            : {},
      showInviteModal   : false,
      showPrivacyModal  : false,
      inviteEmail       : '',
      sendingInvite     : false,
      pendingInvitations: [],
      observations      : [],
      count             : 0,
      total             : 0,
      page              : 1,
      hasMorePages      : false,
      lastPage          : 1,
      pages             : [],
      collections       : [],
      countByUsers      : []
    }
  }

  /**
   * Get group info and users upon mounting
   */
  componentWillMount() {
    this.loadGroup()
    this.loadCollections()

    let state  = this.state
    state.page = this.getBrowserPage()
    this.loadObservations(state)
  }

  /**
   * Get group info and users
   */
  loadGroup() {
    let id = this.props.match.params.id
    axios.get(`/web/group/${id}`).then(response => {
      let data = response.data.data
      this.setState({
        id       : data.id,
        name     : data.name,
        users    : data.users,
        isOwner  : data.is_owner,
        leader   : data.owner,
        isSharing: data.is_sharing
      })

      document.title = `${data.name} - TreeSnap`

      if (data.is_owner) {
        this.loadPendingInvites()
      }
    }).catch(error => {
      console.log(error)
      if (error.response && (error.response.status === 401 || error.response.status === 404)) {
        this.props.history.replace('/no-match')
        return
      }

      console.log(error.response)
    }).then(() => {
      this.setState({pageLoading: false})
    })
  }

  loadCollections() {
    axios.get('/web/collections/owned').then(response => {
      const collections = response.data.data.map(collection => {
        return {
          label: collection.label,
          value: collection.id
        }
      })
      this.setState({collections})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Get pending invites from the server.
   */
  loadPendingInvites() {
    let id = this.props.match.params.id
    axios.get(`/web/invites/${id}`).then(response => {
      this.setState({pendingInvitations: response.data.data})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Set browser history based on current state.
   * @param state
   */
  setBrowserHistory(state) {
    let id = this.props.match.params.id

    if (this.props.admin) {
      this.props.history.replace(`/admin/group/${id}/?page=${state.page}`)
    } else {
      this.props.history.replace(`/account/group/${id}/?page=${state.page}`)
    }
  }

  /**
   * Get page number from the browser url.
   * @returns {*}
   */
  getBrowserPage() {
    let params = Path.parseUrl(this.props.history.location.search)
    if (typeof params.page !== 'undefined') {
      let p = parseInt(params.page)
      if (!isNaN(p)) {
        return p
      }
    }

    return 1
  }

  /**
   * Load observations.
   *
   * @param state
   */
  loadObservations(state) {
    this.setState({loading: true})
    let id = this.props.match.params.id
    axios.get(`/web/group/${id}/observations`, {
      params: {
        page: state.page
      }
    }).then(response => {
      const data = response.data.data

      let pages = this.createPages(data.last_page)

      this.setState({
        observations: data.data,
        total       : data.total,
        count       : data.count,
        page        : data.current_page,
        hasMorePages: data.has_more_pages,
        lastPage    : data.last_page,
        loading     : false,
        pages
      })
    }).catch(error => {
      this.setState({loading: false})

      console.log(error)
    })
  }

  /**
   * Create array of pages.
   *
   * @param lastPage
   * @returns {Array}
   */
  createPages(lastPage) {
    let pages = []
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i)
    }

    return pages
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

    axios.delete(`/web/group/detach`, {
      params: {
        user_id : user.id,
        group_id: this.props.match.params.id
      }
    }).then(response => {
      this.loadGroup()
      EventEmitter.emit('user.groups.updated')
      Notify.push(response.data.data)
    }).catch(error => {
      const response = error.response
      if (response && response.status === 422) {
        const data = response.data

        if (typeof data === 'object') {
          alert(data.user[0])
        } else {
          alert(data)
        }
      }
    })
  }

  /**
   * Exit current group.
   * This method is available to members who don't own the group.
   *
   * @private
   */
  _exitGroup() {
    if (!confirm('Are you sure you want to exit this group? This action is permanent!')) {
      return
    }

    axios.delete(`/web/group/${this.state.id}/exit`).then(response => {
      EventEmitter.emit('user.groups.updated')
      this.props.history.push('/account/groups')
    }).catch(error => {
      alert('Unable to perform action. Please try again later.')
      console.log(error)
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
      return (
        <p>This group has no users. Start inviting users using the "Invite Users" button on the top right corner.</p>)
    }

    let admin = this.props.admin

    return (
      <table className="table is-striped">
        <thead>
        <tr>
          <th>Name</th>
          <th>Observations Shared</th>
          {this.state.isOwner ?
            <th className="has-text-right">Remove from Group</th>
            :
            <th className="has-text-right">Exit Group</th>
          }
        </tr>
        </thead>
        <tbody>
        {this.state.users.map((user, index) => {
          return (
            <tr key={index}>
              <td>
                {admin && User.admin() ?
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                  : user.name}
              </td>
              <td>
                {user.observations_count}
              </td>
              {this.state.isOwner ?
                <td className="has-text-right">
                  {this.state.leader.id !== user.id ?
                    <button className="button is-danger is-small"
                            onClick={() => this._handleDetach.call(this, user)}>
                      <i className="fa fa-times"></i></button>
                    : 'Leader'}
                </td>
                :
                <td className="has-text-right">
                  {User.owns(user.id) ?
                    <button className="button is-danger is-outlined is-small"
                            onClick={this._exitGroup.bind(this)}>
                      Exit Group
                    </button>
                    : null}
                </td>
              }
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
      <form action="#" onSubmit={this.invite.bind(this)}>
        <div className="field has-addons mb-none limit-width">
          <div className="control is-expanded">
            <input type="email"
                   className="input"
                   placeholder="Email"
                   onChange={({target}) => this.setState({inviteEmail: target.value})}
                   value={this.state.inviteEmail}
                   autoFocus={true}/>
          </div>
          <div className="control">
            <button type="submit"
                    className={`button is-primary${this.state.sendingInvite ? ' is-loading' : ''}`}
                    disabled={this.state.sendingInvite}>
              Send Invitation
            </button>
          </div>
        </div>
      </form>
    )
  }

  /**
   * Send invitation to provided email.
   *
   * @param event
   */
  invite(event) {
    if (event) {
      event.preventDefault()
    }

    this.setState({sendingInvite: true})

    let id = this.props.match.params.id
    axios.post('/web/invite', {
      email   : this.state.inviteEmail,
      group_id: id
    }).then(response => {
      let data = response.data.data
      this.setState({
        pendingInvitations: [data].concat(this.state.pendingInvitations),
        sendingInvite     : false,
        inviteEmail       : ''
      })

      Notify.push('Invitation sent successfully.')
    }).catch(error => {
      let response = error.response

      if (response && response.status === 400) {
        this.setState({
          sendingInvite: false,
          inviteEmail  : ''
        })

        Notify.push(error.response.data.error, 'danger')
      }

      if (response && response.status === 422) {
        this.setState({
          formErrors   : Utils.flattenObject(response.data),
          sendingInvite: false
        })
      }
    })
  }

  /**
   * Delete entire group.
   *
   * @private
   */
  _deleteGroup() {
    if (!confirm('Are you sure you want to delete this group? This action is permanent.')) {
      return
    }
    let id = this.props.match.params.id
    axios.delete(`/web/group/${id}`).then(response => {
      EventEmitter.emit('user.groups.updated')
      if (this.props.admin) {
        this.props.history.push('/groups')
      } else {
        this.props.history.push('/account/groups')
      }
    }).catch(error => {
      alert('An error occurred while we were attempting to delete this group. Please contact us to fix this issue.')
    })
  }

  /**
   * Renders form errors if any exist in an alert.
   *
   * @returns {*}
   * @private
   */
  _renderFormErrors() {
    if (this.state.formErrors.length === 0) {
      return null
    }
    return (
      <div>
        {this.state.formErrors.map((error, index) => {
          return (
            <p className="help is-danger" key={index}>{error}</p>
          )
        })}
      </div>
    )
  }

  /**
   * Render the observation card.
   *
   * @param observation
   * @returns {XML}
   * @private
   */
  _renderObservation(observation) {
    return (
      <div className="column is-4-widescreen is-6-desktop is-6-tablet" key={observation.observation_id}>
        <ObservationCard
          owner={true}
          observation={observation}
          loading={this.state.loading}
          collections={this.state.collections}
          onCollectionCreated={collection => {
            let exists = !observation.collections.every(c => c.id !== collection.id)

            if (exists) {
              return
            }

            observation.collections.push(collection)
            this.forceUpdate()
          }}
          onRemovedFromCollection={(collection) => {
            observation.collections = observation.collections.filter(c => c.id !== collection.id)
            this.forceUpdate()
          }}
        />
      </div>
    )
  }

  _renderObservations() {
    let count = this.state.count
    let total = this.state.total

    if (total === 0) {
      return null
    }

    return (
      <div className="mb-2">
        <div className="columns">
          <div className="column">
            <h4 className="title is-4">Group Observations</h4>
          </div>
          <div className="column has-text-right">
            Showing {count} out of {total}
          </div>
        </div>
        <div className="columns is-multiline">
          {this.state.observations.map(this._renderObservation.bind(this))}
        </div>
      </div>
    )
  }

  _renderPendingBox() {
    let invitations = this.state.pendingInvitations
    if (invitations.length === 0) {
      return null
    }

    return (
      <div className="box">
        <h4 className="title is-4">Pending Invitations</h4>

        <table className="table">
          <thead>
          <tr>
            <th>Email</th>
            <th>Sent At</th>
          </tr>
          </thead>
          <tbody>
          {invitations.map((invitation, index) => {
            return (
              <tr key={index}>
                <td>{invitation.email}</td>
                <td style={{width: 250}}>{moment(invitation.created_at).format('LLL')}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }

  /**
   * Go to the next page.
   */
  nextPage() {
    if (!this.state.hasMorePages) {
      return
    }

    let page = this.state.page + 1
    this.goToPage(page)
  }

  /**
   * Go to the previous page.
   */
  prevPage() {
    if (this.state.page === 1) {
      return
    }

    let page = this.state.page - 1
    this.goToPage(page)
  }

  /**
   * Go to a specific page number.
   *
   * @param page
   */
  goToPage(page) {
    let state  = this.state
    state.page = page
    this.loadObservations(state)
    this.setBrowserHistory(state)

    document.body.scrollTop = 0
  }

  /**
   * Render page links.
   *
   * @returns {XML}
   * @private
   */
  _renderPageLinks() {
    if (this.state.total === 0) {
      return null
    }

    return (
      <nav className="pagination is-centered">
        <a href="javascript:;"
           className="pagination-previous"
           onClick={this.prevPage.bind(this)}
           disabled={this.state.page === 1}>
          Previous
        </a>
        {this.state.pages.length > 0 ?
          <ul className="pagination-list">
            <li>
              Page <span className="select is-small">
              <select value={this.state.page} onChange={({target}) => this.goToPage(target.value)}>
                {this.state.pages.map(page => {
                  return <option value={page} key={`page_${page}`}>{page}</option>
                })}
              </select>
            </span> out of {this.state.pages.length} pages
            </li>
          </ul>
          : null}
        <a href="javascript:;"
           className="pagination-next"
           onClick={this.nextPage.bind(this)}
           disabled={!this.state.hasMorePages}>
          Next
        </a>
      </nav>
    )
  }

  _renderPrivacyModal() {
    if (this.state.isSharing) {
      return (
        <div>
          <p className="mb-1">
            You are currently sharing your observations including accurate location coordinates with members
            of this group.
          </p>

          <div className="field">
            <div className="control">
              <button className="button is-danger" type="button" onClick={() => this.changeSharingStatus(false)}>
                Stop Sharing Observations
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <p className="mb-1">
          You are currently <strong>not</strong> sharing your observations with members of this group.
        </p>

        <div className="field">
          <div className="control">
            <button className="button is-primary" type="button" onClick={() => this.changeSharingStatus(true)}>
              Share Observations
            </button>
          </div>
        </div>
      </div>
    )
  }

  changeSharingStatus(share) {
    let id = this.props.match.params.id
    this.setState({loading: true})
    axios.patch(`/web/group/${id}/sharing`, {share}).then(response => {
      this.setState({
        isSharing: response.data.data,
        loading  : false
      })

      this.loadObservations(this.state)
    }).catch(error => {
      console.log(error)
      this.setState({
        loading: false
      })
    })
  }

  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <h1 className="title is-3">{this.state.name}</h1>
          </div>
          <div className="column has-text-right">
            <a href="javascript:;"
               className="button is-default"
               onClick={() => this.setState({showPrivacyModal: true})}>
              <span className="icon is-small">
                <i className="fa fa-lock"></i>
              </span>
              <span>Group Privacy</span>
            </a>
          </div>
        </div>

        <GroupJoinRequests
          groupID={this.props.match.params.id}
          onAccept={this.loadGroup.bind(this)}
        >
        </GroupJoinRequests>

        <div className="box">
          <div className="columns is-mobile flex-v-center">
            <div className="column">
              <h4 className="title is-4">Users</h4>
            </div>
            {this.state.isOwner ?
              <div className="column has-text-right">
                <button type="button"
                        className="button is-primary mr-0"
                        onClick={() => this.setState({showInviteModal: true})}>
                  <span>Invite Users</span>
                </button>
                <button type="button"
                        className="button is-gray"
                        onClick={this._deleteGroup.bind(this)}>
                  <span className="icon is-small">
                    <i className="fa fa-trash"></i>
                  </span>
                </button>
              </div>
              : null}
          </div>

          {this._renderUsersTable()}
        </div>

        {this._renderPendingBox()}
        {this._renderObservations()}
        {this._renderPageLinks()}

        <BoxModal visible={this.state.showInviteModal}
                  onCloseRequest={() => this.setState({showInviteModal: false})}>
          <h4 className="title is-4">
            Invite Users

            <button className="delete is-pulled-right"
                    onClick={() => this.setState({showInviteModal: false})}
                    type="button">
            </button>
          </h4>

          {this._renderForm()}
          {this._renderFormErrors()}
        </BoxModal>

        <BoxModal visible={this.state.showPrivacyModal}
                  onCloseRequest={() => this.setState({showPrivacyModal: false})}>
          <h4 className="title is-4">
            Group Privacy Settings

            <button className="delete is-pulled-right"
                    onClick={() => this.setState({showPrivacyModal: false})}
                    type="button">
            </button>
          </h4>

          {this._renderPrivacyModal()}
        </BoxModal>

        <Spinner visible={this.state.pageLoading}/>
      </div>
    )
  }
}

Group.PropTypes = {
  admin: PropTypes.bool
}

Group.defaultProps = {
  admin: true
}