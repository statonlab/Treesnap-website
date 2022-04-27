import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../components/Spinner'
import Tooltip from '../components/Tooltip'
import Modal from '../components/Modal'
import Select from 'react-select'
import Notify from '../components/Notify'
import {Link} from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import User from '../helpers/User'
import UnshareCollectionModal from '../components/UnshareCollectionModal'
import Scene from './Scene'

export default class CollectionsScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      collections       : [],
      loading           : true,
      showShareModal    : false,
      selectedCollection: {},
      term              : '',
      selectedUser      : null,
      sharing           : false,
      canCustomize      : false,
      sharingErrors     : [],
      showUnshareModal  : false,
      shareWith         : 'user',
      groups            : [],
      selectedGroup     : -1
    }

    this.isAccountPage = window.location.pathname.toLowerCase().indexOf('account') !== -1

    document.title = 'Saved Collections - TreeSnap'
  }

  componentDidMount() {
    this.loadCollections()
    this.loadGroups()
  }

  loadCollections() {
    axios.get('/web/collections').then(response => {
      this.setState({
        collections: response.data.data,
        loading    : false
      })
    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }

  loadGroups() {
    axios.get('/web/groups').then(response => {
      const groups = response.data.data.map(group => {
        return {
          id  : group.id,
          name: group.name
        }
      })

      this.setState({groups})
    }).catch(error => {
      console.log(error)
    })
  }

  deleteCollection(collection) {
    if (collection.is_owner) {
      if (!confirm(`Are you sure you want to delete ${collection.label}?`)) {
        return
      }

      axios.delete(`/web/collection/${collection.id}`).then(response => {
        const id = parseInt(response.data.data.id)
        this.setState({
          collections: this.state.collections.filter(collection => collection.id !== id)
        })
      }).catch(error => {
        console.log(error)
      })
    } else {
      if (!confirm(`Are you sure you want to remove your access privileges to ${collection.label}? This action will not delete the collection.`)) {
        return
      }

      axios.delete(`/web/collection/${collection.id}/unshare`, {
        params: {
          user_id: User.user().id
        }
      }).then(response => {
        const id = parseInt(response.data.data.id)
        this.setState({
          collections: this.state.collections.filter(collection => collection.id !== id)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }

  showShareModal(collection) {
    this.setState({
      showShareModal    : true,
      selectedCollection: collection
    })
  }

  shareCollection(event) {
    event.preventDefault()

    this.setState({sharing: true, sharingErrors: []})

    const id = parseInt(this.state.selectedCollection.id)

    axios.post(`/web/collection/${id}/share`, {
      user_id       : this.state.selectedUser === null ? null : this.state.selectedUser.value,
      can_customize : this.state.canCustomize,
      share_category: this.state.shareWith === 'user' ? 'user' : 'group',
      group_id      : this.state.selectedGroup
    }).then(response => {
      let sharedWith = ''
      if (this.state.shareWith === 'user') {
        sharedWith = this.state.selectedUser.label
      } else {
        let group  = this.state.groups.filter(group => group.id !== this.state.selectedGroup)
        sharedWith = group[0].name
      }
      Notify.push(`You successfully shared ${this.state.selectedCollection.label} with ${sharedWith}`)

      let collections = this.state.collections.map(collection => {
        if (this.state.selectedCollection.id === collection.id) {
          collection.users_count = this.state.shareWith === 'user' ? collection.user_count + response.data.data.count : response.data.data.count
        }
        return collection
      })

      this.setState({
        sharing       : false,
        selectedUser  : null,
        showShareModal: false,
        collections
      })
    }).catch(error => {
      this.setState({
        sharing: false
      })

      const response = error.response

      if (response && response.status === 422) {
        let sharingErrors = Object.keys(response.data).map(key => {
          return response.data[key][0]
        })

        this.setState({
          sharingErrors
        })

        return
      }

      console.log(error)
      Notify.push('Network Error. Please contact us to fix this issue', 'danger')
    })
  }

  searchUsers(term) {
    return axios.get('/web/groups/members', {
      params: {
        term,
        collection_id: this.state.selectedCollection.id
      }
    }).then(response => {
      return {options: response.data.data}
    }).catch(error => {
      console.log(error)
    })
  }

  _renderOption(option) {
    return (
      <div>
        <p>{option.label}</p>
        <small>{option.email}</small>
      </div>
    )
  }

  _renderShareModal() {
    if (!this.state.showShareModal) {
      return null
    }

    let collection = this.state.selectedCollection

    return (
      <Modal showClose={false}
             onCloseRequest={() => this.setState({showShareModal: false})}>
        <form action="#" onSubmit={this.shareCollection.bind(this)}>
          <div className="box">
            <div className="content">
              <p className="modal-card-title">
                Share "{collection.label}" With Others
                <button className="delete is-pulled-right"
                        type="button"
                        onClick={() => this.setState({showShareModal: false})}></button>
              </p>

              <p>
                To share a collection with someone, you must both be members of a group.
                Please {this.props.admin ?
                <Link to={'/groups'}>visit the groups page</Link>
                :
                <Link to={'/account/groups'}>visit the groups page</Link>} to invite others to a group or create a new group
              </p>
            </div>

            <div className="field">
              <label className="label">Share With</label>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field" style={{maxWidth: 125}}>
                  <div className="control">
                    <span className="select" style={{width: '100%'}}>
                      <select value={this.state.shareWith}
                              onChange={({target}) => this.setState({shareWith: target.value})}
                              style={{width: '100%'}}>
                        <option value="user">User</option>
                        <option value="group">Group</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div className="field">
                  {this.state.shareWith === 'user' ? this._renderShareWithUserSelect() : this._renderShareWithGroupSelect()}
                  {this.state.sharingErrors.map((error, i) => {
                    return (
                      <p key={i} className="help is-danger">
                        {error}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Permissions</label>
              <div className="control">
                <span className="select">
                  <select
                    value={this.state.canCustomize}
                    onChange={({target}) => this.setState({canCustomize: target.value === '0' ? 0 : 1})}>
                    <option value="0">View only</option>
                    <option value="1">Edit and view</option>
                  </select>
                </span>
              </div>
            </div>

            <div className="is-flex flex-space-between mt-2">
              <button
                type="submit"
                className={`button is-primary${this.state.sharing ? ' is-loading' : ''}`}
                disabled={this.state.sharing}>
                Share
              </button>
              <button className="button"
                      type="button"
                      onClick={() => this.setState({showShareModal: false})}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal>
    )
  }

  _renderShareWithUserSelect() {
    return (
      <div className="control">
        <Select.Async
          value={this.state.selectedUser}
          loadOptions={this.searchUsers.bind(this)}
          onChange={selectedUser => this.setState({selectedUser})}
          optionRenderer={this._renderOption.bind(this)}
          disabled={this.state.sharing}/>
      </div>
    )
  }

  _renderShareWithGroupSelect() {
    return (
      <div className="control">
        <span className="select">
          <select value={this.state.selectedGroup}
                  onChange={({target}) => this.setState({selectedGroup: parseInt(target.value)})}>
            <option value={-1}>Choose a Group</option>
            {this.state.groups.map(group => {
              return (<option value={group.id} key={group.id}>{group.name}</option>)
            })}
          </select>
        </span>
      </div>
    )
  }

  _renderUnshareModal() {
    if (!this.state.showUnshareModal) {
      return null
    }

    return (
      <UnshareCollectionModal
        onCloseRequest={() => {
          this.setState({
            showUnshareModal  : false,
            selectedCollection: {}
          })
          this.loadCollections()
        }}
        collection={this.state.selectedCollection}
      />
    )
  }

  _renderRow(collection) {
    return (
      <tr key={collection.id}>
        <td>
          {this.props.admin ?
            <Link to={`/observations?collection=${collection.id}`}>{collection.label}</Link>
            :
            <Link to={`/account/observations?collection=${collection.id}`}>{collection.label}</Link>
          }
        </td>
        <td>{collection.observations_count}</td>
        <td>
          {collection.users_count > 1 && collection.is_owner ?
            <a  onClick={() => this.setState({
              showUnshareModal  : true,
              selectedCollection: collection
            })}>
              {collection.users_count - 1} users
            </a>
            :
            <span>{collection.users_count - 1} users</span>
          }

        </td>
        <td className="has-text-right">
          <Dropdown right={true} trigger={(
            <button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu">
              <span className="icon is-small">
                <i className="fa fa-download"></i>
              </span>
              <span className="icon is-small">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          )}>
            <a href={`/services/download/collection/${collection.id}/tsv`} className="dropdown-item">
              TSV Format
            </a>
            <a href={`/services/download/collection/${collection.id}/csv`} className="dropdown-item">
              CSV Format
            </a>
          </Dropdown>
          {collection.is_owner ?
            <button type="button"
                    className="button is-small is-info ml-0"
                    onClick={() => this.showShareModal(collection)}>
              <span className="icon is-small">
                <Tooltip label="Share">
                  <i className="fa fa-share"></i>
                </Tooltip>
              </span>
            </button>
            : null}
          <button type='button'
                  className='button is-small is-danger ml-0'
                  onClick={() => this.deleteCollection(collection)}>
            <span className='icon is-small'>
              <Tooltip label='Delete'>
                <i className='fa fa-times'></i>
              </Tooltip>
            </span>
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h1 className="title is-3">Manage Collections</h1>
        <div className="box">
          {this.state.collections.length > 0 ?
            <table className="table is-striped mb-none">
              <thead>
              <tr>
                <th>Label</th>
                <th>Observations</th>
                <th>Shared With</th>
                <th className="has-text-right">Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.collections.map(this._renderRow.bind(this))}
              </tbody>
            </table>
            :
            <p>
              You have not created any collections yet.
              You can create new collections in the {
              this.isAccountPage ? <span>
                <Link to="/map">Map</Link> or <Link to={"/account/observations"}>your observations</Link>
              </span> : <Link to="/observations">Observations</Link>
            } page using the <i className="fa fa-star"></i> icon.
            </p>
          }
        </div>
        <Spinner visible={this.state.loading}/>
        {this._renderShareModal()}
        {this._renderUnshareModal()}
      </div>
    )
  }
}

CollectionsScene
  .propTypes = {
  admin: PropTypes.bool
}

CollectionsScene
  .defaultProps = {
  admin: false
}
