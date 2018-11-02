import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Spinner from '../../components/Spinner'
import Select from 'react-select'
import ObservationCard from '../../components/ObservationCard'
import Scene from '../../scenes/Scene'
import EmailModal from '../components/EmailModal'

export default class UserScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      id          : -1,
      email       : '',
      name        : '',
      birth_year  : 1980,
      editing     : false,
      perPage     : 6,
      offset      : 0,
      numPages    : 0,
      roles       : [],
      groups      : [],
      loading     : true,
      errors      : null,
      role        : {
        name    : '',
        is_admin: false
      },
      role_id     : -1,
      observations: [],
      showEmail   : false,
      contact     : {
        to         : {
          user_id: -1,
          name   : ''
        },
        from       : '',
        observation: {}
      }
    }
  }

  /**
   * Get the user's data from the server
   */
  componentWillMount() {
    this.getUser()
    this.getRoles()

    this._years = this._generateBirthDateOptions()
  }

  /**
   * Get all available roles
   */
  getRoles() {
    axios.get('/admin/web/roles').then(response => {
      let roles = response.data.data
      this.setState({roles})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Get the user from the server.
   */
  getUser() {
    // Get the user
    axios.get(`/admin/web/user/${this.props.match.params.id}`).then(response => {
      let data = response.data.data

      let user = this._userObject(data.user)

      let state = Object.assign({}, user, {
        observations: data.observations,
        numPages    : Math.ceil(data.observations.length / this.state.perPage),
        loading     : false
      })

      this.setState(state)

      document.title = `${user.name} - TreeSnap`
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  /**
   * Generate birth years.
   * @returns {Array}
   * @private
   */
  _generateBirthDateOptions() {
    let today = parseInt(moment().format('YYYY').toString())
    let dates = []
    for (let i = today; i > today - 101; i--) {
      dates.push(i)
    }
    return dates
  }

  _userObject(data) {
    let groups = []

    data.groups.map(group => groups.push({
      label: group.name,
      value: group.id
    }))

    return {
      id          : data.id,
      name        : data.name,
      email       : data.email,
      birth_year  : data.birth_year,
      role        : data.role,
      role_id     : data.role.id,
      class       : data.class,
      is_anonymous: data.is_anonymous,
      zipcode     : data.zipcode,
      user_groups : groups,
      created_at  : data.created_at
    }
  }

  /**
   * Get groups from the server.
   */
  getGroups() {
    // Get all available groups
    return axios.get('/admin/web/groups').then(response => {
      let data   = response.data.data
      let groups = []

      data.map(group => groups.push({
        label: group.name,
        value: group.id
      }))

      return {options: groups}
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Render personal info box.
   *
   * @returns {*}
   * @private
   */
  _renderPersonalInfo() {
    if (this.state.name === '' || this.state.editing) {
      return null
    }

    return (
      <div className="box">
        <div className="columns flex-v-center">
          <div className="column">
            <h4 className="title is-4">Personal Information</h4>
          </div>
          <div className="column has-text-right">
            <button type="button" className="button is-info" onClick={(e) => {
              e.preventDefault()
              this.setState({editing: !this.state.editing})
            }}>
              Edit
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table is-striped mb-none">
            <tbody>
            <tr>
              <th style={{width: '240px'}}>Name</th>
              <td>{this.state.name}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{this.state.role.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{this.state.email}</td>
            </tr>
            <tr>
              <th>Zip Code</th>
              <td>{this.state.zipcode}</td>
            </tr>
            <tr>
              <th>Number of Observations</th>
              <td>{this.state.observations.length}</td>
            </tr>
            <tr>
              <th>Birth Year</th>
              <td>{this.state.birth_year}</td>
            </tr>
            <tr>
              <th>Class</th>
              <td>{this.state.class}</td>
            </tr>
            <tr>
              <th>Anonymous</th>
              <td>{this.state.is_anonymous ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th>Groups</th>
              <td>
                {this.state.user_groups.length === 0 && 'The user does not belong to any groups'}
                {this.state.user_groups.map((group, index) => {
                  return (<span key={index}>{group.label},</span>)
                })}
              </td>
            </tr>
            <tr>
              <th>Date Joined</th>
              <td>
                {moment(this.state.created_at).format('MMM Do, YYYY')} ({moment(this.state.created_at).fromNow()})
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  /**
   * Render observation cards
   * @returns {*}
   * @private
   */
  _renderObservations() {
    if (this.state.name === '') {
      return null
    }

    return (
      <div>
        <h4 className="title is-4">Observations</h4>

        {this.state.observations.length === 0 ?
          <p className="box">The user didn't submit any observations</p>
          : null
        }

        <div className="columns is-multiline is-tablet">
          {this.state.observations.map((observation, index) => {
            if (index < this.state.offset * this.state.perPage || index >= (this.state.offset * this.state.perPage) + this.state.perPage) {
              return null
            }
            return (
              <div className="column is-6-tablet is-4-desktop" key={index}>
                <ObservationCard
                  observation={observation}
                  onEmailRequest={() => {
                    this.setState({
                      showEmail: true,
                      contact  : {
                        to  : {
                          user_id: this.state.id,
                          name   : this.state.name
                        },
                        from: this.state.email,
                        observation
                      }
                    })
                  }}/>
              </div>
            )
          })}
        </div>

        {this._renderPaginationLinks()}
      </div>
    )
  }

  /**
   * Page control: render links
   *
   * @returns {*}
   * @private
   */
  _renderPaginationLinks() {
    if (this.state.observations.length <= this.state.perPage) {
      return null
    }

    let links = []
    for (let i = 0; i < this.state.numPages; i++) {
      links.push(i + 1)
    }

    return (
      <nav className="pagination is-centered">
        <a href="javascript:;" className="pagination-previous"
           onClick={this._prevPage.bind(this)} {...this.state.offset === 0 && {disabled: 'disabled'}}>
          Previous
        </a>
        <a href="javascript:;" className="pagination-next"
           onClick={this._nextPage.bind(this)}
           {...this.state.offset === this.state.numPages - 1 && {disabled: 'disabled'}}
        >
          Next
        </a>
        <ul className="pagination-list">
          {links.map((link, index) => {
            return (
              <li key={index}>
                <a href="javascript:;"
                   className={`pagination-link ${this.state.offset === link - 1 && 'is-current'}`}
                   onClick={e => this._page.call(this, e, link)}
                   {...this.state.offset === link - 1 && {disabled: 'disabled'}}
                >
                  {link}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  /**
   * Page control: next.
   *
   * @private
   */
  _nextPage() {
    if (this.state.offset + 1 >= this.state.numPages) {
      return
    }

    this.setState({offset: this.state.offset + 1})
  }

  /**
   * Page control: previous.
   *
   * @private
   */
  _prevPage() {
    if (this.state.offset <= 0) {
      return
    }

    this.setState({offset: this.state.offset - 1})
  }

  /**
   * Page control: go to page.
   * @param e
   * @param page
   * @private
   */
  _page(e, page) {
    e.preventDefault()

    this.setState({offset: page - 1})
  }

  /**
   * Render form errors.
   *
   * @private
   */
  _renderErrors() {
    if (this.state.errors === null) {
      return null
    }

    let errors = this.state.errors

    let flattened = []

    Object.keys(errors).map(key => {
      errors[key].map(error => {
        flattened.push(error)
      })
    })

    return (
      <div className="alert is-danger">
        {flattened.map((error, index) => {
          return <p key={index}>{error}</p>
        })}
      </div>
    )
  }

  /**
   * Render form
   *
   * @returns {*}
   * @private
   */
  _renderEditingForm() {
    if (!this.state.editing) {
      return null
    }

    return (
      <div className="box">
        <h4 className="title is-4">Personal Information</h4>

        {this._renderErrors()}

        <form action="#" onSubmit={this.updateUserInfo.bind(this)}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input type="text"
                     className="input limit-width"
                     value={this.state.name}
                     onChange={(e) => this.setState({name: e.target.value})}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <span className="select">
                <select onChange={({target}) => this.setState({role_id: target.value})}
                        value={this.state.role_id}>
                  {this.state.roles.map(role => {
                    return (<option key={role.id} value={role.id}>{role.name}</option>)
                  })}
                </select>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input type="email"
                     className="input limit-width"
                     value={this.state.email}
                     onChange={(e) => this.setState({email: e.target.value})}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Zip Code</label>
            <div className="control">
              <input type="text"
                     className="input limit-width"
                     value={this.state.zipcode || ''}
                     onChange={(e) => this.setState({zipcode: e.target.value})}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Class</label>
            <div className="control">
              <input type="text"
                     className="input limit-width"
                     value={this.state.class}
                     onChange={(e) => this.setState({class: e.target.value})}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Groups</label>
            <div className="control limit-width">
              <Select.Async value={this.state.user_groups}
                            loadOptions={this.getGroups.bind(this)}
                            onChange={value => {
                              this.setState({user_groups: value})
                            }}
                            multi={true}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">
                Birth Year
              </label>
              <div className="control">
                <span className="select">
                  <select
                    value={this.state.birth_year}
                    onChange={({target}) => this.setState({birth_year: target.value})}>
                    {this._years.map((year, i) => {
                      return <option value={year} key={i}>{year}</option>
                    })}
                  </select>
                </span>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox"
                       onChange={e => this.setState({is_anonymous: e.target.checked})}
                       value={this.state.is_anonymous}
                       defaultChecked={this.state.is_anonymous}/>
                <span className="ml-1">This user is anonymous</span>
              </label>
            </div>
          </div>

          <div className="box-footer">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-primary">Save</button>
                  </div>
                </div>
              </div>
              <div className="column has-text-right">
                <button type="button" className="button is-link" onClick={(e) => {
                  e.preventDefault()
                  this.getUser.call(this)
                  this.setState({editing: !this.state.editing})
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

  /**
   * Handle role change.
   *
   * @param e
   * @private
   */
  _handleRoleChange(e) {
    let selectedRole = {}
    this.state.roles.map(role => {
      if (role.id === e.target.value) {
        selectedRole = role
      }
    })
    this.setState({role: selectedRole})
  }

  /**
   * Update the server info.
   *
   * @param e react native event
   */
  updateUserInfo(e) {
    e.preventDefault()

    this.setState({loading: true})

    // Convert groups to an array of ids
    let groups = []
    this.state.user_groups.map(group => {
      groups.push(group.value)
    })

    axios.put(`/admin/web/user/${this.props.match.params.id}`, {
      name        : this.state.name,
      email       : this.state.email,
      class       : this.state.class,
      role        : this.state.role_id,
      groups      : groups,
      is_anonymous: this.state.is_anonymous,
      birth_year  : this.state.birth_year,
      zipcode     : this.state.zipcode
    }).then(response => {
      let user = this._userObject(response.data.data)
      this.setState(Object.assign({}, user, {editing: false, errors: null}))
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        this.setState({errors: error.response.data})
      }
    }).then(() => {
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <div>
        <h1 className="title is-3">{this.state.name !== '' ? this.state.name : 'User Page'}</h1>
        {this._renderEditingForm()}
        {this._renderPersonalInfo()}
        {this._renderObservations()}
        <Spinner visible={this.state.loading}/>
        {this.state.showEmail ? <EmailModal visible={this.state.showEmail}
                                            contact={this.state.contact}
                                            observation={this.state.contact.observation}
                                            onCloseRequest={() => this.setState({showEmail: false})}/> : null}
      </div>
    )
  }
}

UserScene.propTypes = {
  location: PropTypes.object.isRequired
}
