import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Spinner from './Spinner'
import BoxModal from './BoxModal'
import Notify from './Notify'
import moment from 'moment'
import Utils from '../helpers/Utils'

export default class Group extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name              : '',
            users             : [],
            loading           : true,
            formUsers         : [],
            formErrors        : [],
            isOwner           : false,
            leader            : {},
            showInviteModal   : false,
            inviteEmail       : '',
            sendingInvite     : false,
            pendingInvitations: []
        }
    }

    /**
     * Get group info and users upon mounting
     */
    componentWillMount() {
        this.loadGroup()
    }

    /**
     * Get group info and users
     */
    loadGroup() {
        let id = this.props.match.params.id
        axios.get(`/web/group/${id}`).then(response => {
            let data = response.data.data

            this.setState({
                name   : data.name,
                users  : data.users,
                isOwner: data.is_owner,
                leader : data.owner
            })

            document.title = `${data.name} - TreeSnap`

            if (data.is_owner) {
                this.loadPendingInvites()
            }
        }).catch(error => {
            if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                this.props.history.replace('/no-match')
                return
            }

            console.log(error.response)
        }).then(() => {
            this.setState({loading: false})
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
                    {this.state.isOwner ? <th className="has-text-right">Remove from Group</th> : null }
                </tr>
                </thead>
                <tbody>
                {this.state.users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {admin && window.TreeSnap.isAdmin ?
                                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                                    : user.name }
                            </td>
                            {this.state.isOwner ?
                                <td className="has-text-right">
                                    {this.state.leader.id !== user.id ?
                                        <button className="button is-danger is-small"
                                                onClick={() => this._handleDetach.call(this, user)}>
                                            <i className="fa fa-times"></i></button>
                                        : 'Leader'}

                                </td>
                                : null }
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
            this.props.history.push('/groups')
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

    _renderDeleteGroup() {
        if (!this.state.isOwner) {
            return null
        }

        return (
            <div className="has-text-right">
                <button type="button" className="button is-gray" onClick={this._deleteGroup.bind(this)}>
                    Delete Group
                </button>
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

    render() {
        return (
            <div>
                <h1 className="title is-3">{this.state.name}</h1>

                <div className="box">
                    <div className="columns is-mobile flex-v-center">
                        <div className="column">
                            <h4 className="title is-4">Users</h4>
                        </div>
                        {this.state.isOwner ?
                            <div className="column has-text-right">
                                <button type="button"
                                        className="button is-primary"
                                        onClick={() => this.setState({showInviteModal: true})}
                                >
                                    <span>Invite Users</span>
                                </button>
                            </div>
                            : null}
                    </div>

                    {this._renderUsersTable()}
                </div>

                {this._renderPendingBox()}

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

                {this._renderDeleteGroup()}
                <Spinner visible={this.state.loading}/>
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