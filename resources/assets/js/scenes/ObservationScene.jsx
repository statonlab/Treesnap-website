import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import Spinner from '../components/Spinner'
import ObservationDetails from '../components/ObservationDetails'
import Notify from '../components/Notify'
import moment from 'moment'
import User from '../helpers/User'
import EventEmitter from '../helpers/EventEmitter'
import Helmet from 'react-helmet'

export default class ObservationScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading     : false,
      observation : null,
      updatingNote: false,
      note        : '',
      noteSavedAt : null,
      deleted     : false,
      errors      : {
        note: []
      }
    }
  }


  componentDidMount() {
    let id = this.props.match.params.id
    this.loadObservation(id)
    this.loadNotes(id)

    EventEmitter.listen('observation_deleted', this.observationDeleted.bind(this))
  }

  componentWillUnmount() {
    //EventEmitter.remove('observation_deleted', this.observationDeleted.bind(this))
  }

  observationDeleted() {
    this.setState({deleted: true})
  }

  loadObservation(id) {
    this.setState({loading: true})

    axios.get(`/web/observation/${id}`).then(response => {
      const data = response.data.data

      this.setState({
        observation: data,
        loading    : false
      })

      const name     = data.observation_category.toLowerCase() === 'other' ? `Other: ${data.meta_data.otherLabel}` : data.observation_category
      document.title = `${name} (${data.observation_id}) | TreeSnap`
    }).catch(error => {
      this.setState({loading: false})

      if (error.response && error.response.status === 404) {
        console.log('Not Found')
        window.location.replace('/no-match')
      }
    })
  }

  loadNotes(observation_id) {
    if (!User.authenticated()) {
      return
    }

    axios.get(`/web/note/${observation_id}`).then(response => {
      let note = response.data.data

      if (note.not_found) {
        // The user did not create a note yet
        // Ignore the error
        return
      }

      this.setState({
        note       : note.note,
        noteSavedAt: note.updated_at
      })
    }).catch(error => {
      console.log(error)
    })
  }

  saveNote(e) {
    e.preventDefault()

    this.setState({updatingNote: true})

    let observation_id = this.state.observation.observation_id
    let note           = this.state.note

    axios.post('/web/notes', {observation_id, note}).then(response => {
      let data = response.data.data
      this.setState({
        updatingNote: false,
        errors      : {note: []},
        noteSavedAt : data.updated_at
      })

      if (data.created) {
        Notify.push('Note saved successfully')
      }

      if (data.deleted) {
        Notify.push('Note was deleted successfully', 'warning')
      }
    }).catch(error => {
      let response = error.response
      if (response && response.status === 422) {
        this.setState({
          updatingNote: false,
          errors      : response.data
        })
      }
    })
  }

  detachCollection(collection) {
    axios.delete('/web/collection/detach', {
      params: {
        observation_id: this.state.observation.observation_id,
        collection_id : collection.id
      }
    }).then(response => {
      Notify.push(`Observation removed from "${collection.label}" successfully`)

      let observation = this.state.observation

      observation.collections = observation.collections.filter(c => c.id !== collection.id)

      this.setState({
        observation
      })
    }).catch(error => {
      console.log(error)
    })
  }

  detachFlag(flag) {
    axios.delete(`/web/flag/${flag.id}`).then(response => {
      Notify.push('Flag deleted successfully')

      let observation = this.state.observation

      observation.flags = observation.flags.filter(f => f.id !== flag.id)

      this.setState({
        observation
      })
    }).catch(error => {
      console.log(error)
    })
  }

  _renderMetaView(observation) {
    if (!User.authenticated()) {
      return (
        <div className="box">
          <p>
            <a href="/login">Login</a> or <a href="/register">register a new account</a> to
            create collections, flag observations or add private notes to an observation.
          </p>
        </div>
      )
    }

    return (
      <div className="columns">
        <div className="column is-6">
          <div className="box">
            <h4 className="title is-5">Notes</h4>
            <form action="#" onSubmit={this.saveNote.bind(this)}>
              <div className="field">
                <div className="control">
                    <textarea className={`textarea${this.state.errors.note.length > 0 ? ' is-danger' : ''}`}
                              placeholder="Private Notes"
                              value={this.state.note}
                              onChange={({target}) => this.setState({
                                note  : target.value,
                                errors: {note: []}
                              })}>
                    </textarea>
                </div>
                {this.state.errors.note.map((error, index) => {
                  return (
                    <p className="help is-danger" key={index}>{error}</p>
                  )
                })}
                <p className="help">You may add private notes to this observation by filling the text box above.</p>
              </div>

              <div className="field">
                <div className="control is-flex flex-v-center flex-space-between">
                  <button type="submit"
                          className={`button is-primary${this.state.updatingNote ? ' is-loading' : ''}`}
                          disabled={this.state.updatingNote}>
                    Save
                  </button>

                  {this.state.noteSavedAt !== null ?
                    <p className="help">Last updated at {moment(this.state.noteSavedAt.date).format('LLL')}</p>
                    : null}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="column is-6">
          <div className="box">
            <h4 className="title is-5">Collections</h4>
            {observation.collections.length === 0 ?
              <p>You have not added this observation to any collections yet.</p>
              : null}
            {observation.collections.map(collection => {
              return (
                <div className="flexbox flex-space-between" key={collection.id}>
                  <p>{collection.label}</p>
                  <button className="button is-small is-outlined is-danger"
                          onClick={() => this.detachCollection(collection)}>
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
          <div className="box">
            <h4 className="title is-5">Flags</h4>
            {observation.flags.length === 0 ?
              <p>You have not flagged this observation.</p>
              : null}
            {observation.flags.map(flag => {
              return (
                <div className="flexbox flex-space-between" key={flag.id}>
                  <div>
                    <p>
                      You have flagged this observation as: "<b>{flag.reason}</b>"
                    </p>
                    <p>
                      {flag.comments}
                    </p>
                  </div>
                  <button className="button is-danger is-outlined is-small"
                          onClick={() => this.detachFlag(flag)}>
                    Remove Flag
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  _renderContent(observation) {
    if (observation === null) {
      return null
    }

    return (
      <div>
        <ObservationDetails
          observation={observation}
          showControls={true}
          onAddedToCollection={(collection) => {
            let observation = this.state.observation
            let exists      = !observation.collections.every(c => c.id !== collection.id)

            if (!exists) {
              observation.collections.push(collection)
              this.setState({observation})
            }
          }}
          onFlagCreated={(flag) => {
            let observation = this.state.observation
            let exists      = !observation.flags.every(f => f.id !== flag.id)

            if (!exists) {
              observation.flags.push(flag)
              this.setState({observation})
            }
          }}
        />

        {this.state.deleted ? null : this._renderMetaView(observation)}
      </div>
    )
  }

  getImage(observation) {
    let keys = Object.keys(observation.images)
    if (keys.length > 0) {
      return observation.images[keys[0]][0]
    } else {
      return ''
    }
  }

  getMeta() {
    if (!this.state.observation) {
      return null
    }

    const observation = this.state.observation
    const title       = (observation.observation_category === 'Other' ? observation.meta_data.otherLabel : observation.observation_category)
    const description = `${title} was observed and shared with scientists on TreeSnap`
    const image       = this.getImage(observation)
    const url         = `https://treesnap.org/observation/${observation.observation_id}`

    return (
      <Helmet>
        <meta property="og:title" content={title + ` (${observation.observation_id}) | TreeSnap`}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={image}/>
        <meta property="og:url" content={url}/>

        <meta name="twitter:title" content={title + ` (${observation.observation_id}) | TreeSnap`}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={image}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.getMeta()}
        {this.props.admin ? null : <Navbar/>}
        <Spinner visible={this.state.loading}/>
        <div className="home-section short-content">
          <div className={this.props.admin ? '' : 'container'}>
            {this._renderContent(this.state.observation)}
          </div>
        </div>
        {this.props.admin ? null : <HomeFooter/>}
      </div>
    )
  }
}

ObservationScene.PropTypes = {
  admin: PropTypes.bool
}

ObservationScene.defaultProps = {
  admin: false
}
