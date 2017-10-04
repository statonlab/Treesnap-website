import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../components/Spinner'
import Tooltip from '../components/Tooltip'
import Modal from '../components/Modal'
import Select from 'react-select'
import Notify from '../components/Notify'
import {Link} from 'react-router-dom'
import Dropdown from '../components/Dropdown'

export default class CollectionsScene extends Component {
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
      sharingErrors     : []
    }


    this.account = window.location.pathname.toLowerCase().indexOf('account') !== -1

    document.title = 'Saved Collections - TreeSnap'
  }

  componentWillMount() {
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

  deleteCollection(collection) {
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
  }

  showShareModal(collection) {
    this.setState({
      showShareModal    : true,
      selectedCollection: collection
    })
  }

  shareCollection(event) {
    event.preventDefault()

    if (this.state.selectedUser === null) {
      this.setState({sharingErrors: ['Please select a user to share with first']})
      return
    }

    this.setState({sharing: true, sharingErrors: []})

    const id = parseInt(this.state.selectedCollection.id)

    axios.post(`/web/collection/${id}/share`, {
      user_id: this.state.selectedUser.value
    }).then(() => {
      Notify.push(`You successfully shared ${this.state.selectedCollection.label} with ${this.state.selectedUser.label}`)

      let collections = this.state.collections.map(collection => {
        if (this.state.selectedCollection.id === collection.id) {
          collection.users_count += 1
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
        term
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
              <div className="control">
                <Select.Async
                  value={this.state.selectedUser}
                  loadOptions={this.searchUsers.bind(this)}
                  onChange={selectedUser => this.setState({selectedUser})}
                  optionRenderer={this._renderOption.bind(this)}
                  disabled={this.state.sharing}/>
              </div>
              {this.state.sharingErrors.map((error, i) => {
                return (
                  <p key={i} className="help is-danger">
                    {error}
                  </p>
                )
              })}
            </div>
            <div className="is-flex flex-space-between mt-2">
              <button
                type="submit"
                className={`button is-primary${this.state.sharing ? ' is-loading' : ''}`}
                disabled={this.state.sharing}>
                Share
              </button>
              <button className="button" type="button">Cancel</button>
            </div>
          </div>
        </form>
      </Modal>
    )
  }

  _renderRow(collection) {
    return (
      <tr key={collection.id}>
        <td>{this.props.admin ?
          <Link to={`/observations?collection=${collection.id}`}>{collection.label}</Link>
          : <Link to={`/account/observations?collection=${collection.id}`}>{collection.label}</Link>
        }</td>
        <td>{collection.observations_count}</td>
        <td>{collection.users_count - 1} users</td>
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
            <div style={{display: 'inline-block'}}>
              <button type="button"
                      className="button is-small is-info ml-0"
                      onClick={() => this.showShareModal(collection)}>
                <span className="icon is-small">
                  <Tooltip label="Share">
                    <i className="fa fa-share"></i>
                  </Tooltip>
                </span>
              </button>
              <button type='button'
                      className='button is-small is-danger ml-0'
                      onClick={() => this.deleteCollection(collection)}>
                <span className='icon is-small'>
                  <Tooltip label='Delete'>
                    <i className='fa fa-times'></i>
                  </Tooltip>
                </span>
              </button>
            </div>
            : null}
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
              this.account ? <Link to="/map">Map</Link> : <Link to="/observations">Observations</Link>
            } page.
            </p>
          }
        </div>
        <Spinner visible={this.state.loading}/>
        {this._renderShareModal()}
      </div>
    )
  }
}

CollectionsScene.PropTypes = {
  admin: PropTypes.bool
}

CollectionsScene.defaultProps = {
  admin: false
}