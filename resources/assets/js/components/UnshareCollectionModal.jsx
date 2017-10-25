import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from '../components/Modal'
import Notify from '../components/Notify'

export default class UnshareCollectionModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users   : [],
      loading : true,
      messages: []
    }
  }

  componentWillMount() {
    let id = this.props.collection.id

    axios.get(`/web/collection/${id}/users`).then(response => {
      let data = response.data.data
      this.setState({
        users  : data,
        loading: false
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        loading: false
      })
    })
  }

  unshareCollection(user) {
    let id = this.props.collection.id

    axios.delete(`/web/collection/${id}/unshare`, {
      params: {
        user_id: user.id
      }
    }).then(response => {
      this.setState({
        loading: false,
        users  : this.state.users.filter(u => u.id !== user.id)
      })
    }).catch(error => {
      console.log(error)
    })
  }

  changePermissions(user, canCustomize) {
    let id = this.props.collection.id
    this.setState({loading: true})
    axios.patch(`/web/collection/${id}/permissions`, {
      user_id      : user.id,
      can_customize: canCustomize
    }).then(response => {
      Notify.push(response.data.data)

      this.setState({
        loading: false,
        users: this.state.users.map(u => {
          if (u.id === user.id) {
            u.pivot.can_customize = canCustomize
          }

          return u
        })
      })
    }).catch(error => {
      this.setState({loading: false})

      if (error.response && error.response.status === 422) {
        let errors   = error.response.data
        let messages = Object.keys(errors).map(key => {
          return {
            type: 'is-danger',
            text: errors[key][0]
          }
        })
        this.setState({messages})
      }
      console.log(error)
    })
  }

  _renderMessages() {
    if (this.state.messages.length === 0) {
      return null
    }

    return this.state.messages.map((message, index) => {
      return (
        <div className={`notification ${message.type}`} key={index}>
          {message.text}
        </div>
      )
    })
  }

  render() {
    let collection = this.props.collection
    let usersCount = this.state.users.length

    return (
      <Modal showClose={false}
             onCloseRequest={() => this.props.onCloseRequest()}>
        <div className="modal-card">
          <div className="modal-card-head">
            <p className="modal-card-title">
              "{collection.label}" Users
              <button className="delete is-pulled-right"
                      type="button"
                      onClick={() => this.props.onCloseRequest()}></button>
            </p>
          </div>

          <div className="modal-card-body">
            {this.state.loading ? <p>Please wait...</p> : null}

            {this.state.users.length === 0 && !this.state.loading ?
              <p>This collection is not shared with any users.</p>
              : null}

            {this._renderMessages()}

            {this.state.users.map((user, index) => {
              return (
                <div className={`columns flex-v-center${index !== usersCount - 1 ? ' border-bottom' : ''}`}
                     key={user.id}>
                  <div className="column">
                    <p><strong>{user.name}</strong></p>
                    <span className="help is-muted">{user.email}</span>
                  </div>
                  <div className="column has-text-right">
                    <span className="select is-small mr-0">
                      <select value={user.pivot.can_customize}
                              onChange={({target}) => this.changePermissions(user, target.value)}>
                        <option value={0}>View Only</option>
                        <option value={1}>View and Edit</option>
                      </select>
                    </span>
                    <button type="button"
                            onClick={() => this.unshareCollection(user)}
                            className="button is-danger is-outlined is-small">
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="modal-card-foot flex-space-between">
            <button
              onClick={this.props.onCloseRequest}
              type="submit"
              className={`button is-primary${this.state.loading ? ' is-loading' : ''}`}
              disabled={this.state.loading}>
              Done
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

UnshareCollectionModal.PropTypes = {
  collection: PropTypes.object.isRequired
}