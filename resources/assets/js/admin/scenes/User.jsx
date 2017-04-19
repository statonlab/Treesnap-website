import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import Spinner from '../../components/Spinner'
import Select from 'react-select'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name    : '',
            editing : false,
            perPage : 6,
            offset  : 0,
            numPages: 0,
            roles   : [],
            groups  : [],
            loading : true,
            errors  : null,
            role    : {
                name    : '',
                is_admin: false
            }
        }
    }

    /**
     * Get the user's data from the server
     */
    componentWillMount() {
        this.getUser()

        // Get all available roles
        axios.get('/admin/api/roles').then(response => {
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
        axios.get(`/admin/api/user/${this.props.match.params.id}`).then(response => {
            let data = response.data.data

            let groups = []

            data.groups.map(group => groups.push({
                label: group.name,
                value: group.id
            }))

            this.setState({
                name            : data.name,
                email           : data.email,
                observations    : data.observations,
                is_over_thirteen: data.is_over_thirteen,
                role            : data.role,
                class           : data.class,
                is_anonymous    : data.is_anonymous,
                zipcode         : data.zipcode,
                user_groups     : groups,
                created_at      : data.created_at,
                numPages        : Math.ceil(data.observations.length / this.state.perPage)
            })
        }).catch(error => {
            console.log(error)
        }).then(() => {
            this.setState({loading: false})
        })
    }

    /**
     * Get groups from the server.
     */
    getGroups() {
        // Get all available groups
        return axios.get('/admin/api/groups').then(response => {
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
                            <td>{this.state.role.is_admin ? 'Admin' : 'User'}</td>
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
                            <th>Over 13 Years Old</th>
                            <td>{this.state.is_over_thirteen ? 'Yes' : 'No'}</td>
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
                                <div className="card has-bg-image">
                                    <div className="card-image"
                                         style={{backgroundImage: `url(${observation.images[0] || '/images/placeholder.png'})`}}>
                                    </div>
                                    <div className="card-content">
                                        <div className="content">
                                            <h3 className="title is-4">{observation.observation_category}</h3>
                                            {observation.latitude}, {observation.longitude}<br/>
                                            <a href={`/observation/${observation.id}`}>See Full Details</a>
                                            <br/>
                                            <small>{moment(observation.collection_date).format('lll')}</small>
                                        </div>
                                    </div>
                                </div>
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
                        <label className="label">Role</label>
                        <div className="control">
                        <span className="select">
                            <select onChange={this._handleRoleChange.bind(this)}
                                    value={this.state.role.id}>
                                {this.state.roles.map((role, index) => {
                                    return (<option key={index} value={role.id}>{role.name}</option>)
                                })}
                            </select>
                        </span>
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
                            <label className="checkbox">
                                <input type="checkbox"
                                       onChange={e => this.setState({is_anonymous: e.target.checked})}
                                       value={this.state.is_anonymous}/>
                                This user is anonymous
                            </label>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox"
                                       onChange={e => this.setState({is_over_thirteen: e.target.checked})}
                                       value={this.state.is_over_thirteen}
                                       defaultChecked={this.state.is_over_thirteen}/>
                                This user is over 13 years old
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

    _handleRoleChange(e) {
        let selectedRole = {}
        this.state.roles.map(role => {
            if (role.id === e.target.value) {
                selectedRole = role
            }
        })
        this.setState({role: selectedRole})
    }

    updateUserInfo(e) {
        e.preventDefault()

        this.setState({loading: true})

        // Convert groups to an array of ids
        let groups = []
        this.state.user_groups.map(group => {
            groups.push(group.value)
        })

        axios.put(`/admin/api/user/${this.props.match.params.id}`, {
            name            : this.state.name,
            email           : this.state.email,
            class           : this.state.class,
            role            : this.state.role.id,
            groups          : groups,
            is_anonymous    : this.state.is_anonymous,
            is_over_thirteen: this.state.is_over_thirteen,
            zipcode         : this.state.zipcode
        }).then(response => {
            this.setState({editing: false, errors: null})
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
            </div>
        )
    }
}

User.PropTypes = {
    location: PropTypes.object.isRequired
}