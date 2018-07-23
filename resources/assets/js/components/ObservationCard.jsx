import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Tooltip from './Tooltip'
import moment from 'moment'
import CollectionForm from './CollectionForm'
import FlagForm from './FlagForm'
import Map from './Map'
import Marker from './Marker'
import Spinner from './Spinner'
import Notify from './Notify'
import ObservationDetailsModal from './ObservationDetailsModal'
import {Link} from 'react-router-dom'
import User from '../helpers/User'

export default class ObservationCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slide            : false,
      slideContent     : '',
      flagged          : false,
      flag_id          : 0,
      addedToCollection: false,
      observationId    : 0,
      loading          : false,
      confirmation     : {
        id     : -1,
        correct: null
      },
      correctMarks     : 0,
      incorrectMarks   : 0,
      showDetailsModal : false,
    }

    this.timeoutWatcher = null
  }

  /**
   * Set up flags and confirmations
   */
  componentWillMount() {
    const observation = this.props.observation

    if (observation.flags.length > 0) {
      this.setState({
        flagged: true,
        flag_id: observation.flags[0].id
      })
    }

    if (observation.confirmations.length > 0) {
      this.setState({
        confirmation: observation.confirmations[0]
      })
    }

    if (this.props.showMarks) {
      this.loadMarks()
    }
  }

  loadMarks() {
    let id = this.props.observation.observation_id

    axios.get(`/admin/web/confirmations/count/${id}`).then(response => {
      let data = response.data.data
      this.setState({
        correctMarks  : data.correct,
        incorrectMarks: data.incorrect
      })
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Determine if the content page should show or hide.
   *
   * @param label
   */
  shouldSlide(label) {
    let oldLabel = this.state.slideContent
    let slide    = this.state.slide

    if (this.timeoutWatcher) {
      clearTimeout(this.timeoutWatcher)
    }

    // Clicked twice on the same pane
    if (oldLabel === label) {
      this.slowCloseSlideContent()

      return
    }
    else if (slide) {
      this.setState({
        slideContent: label
      })

      return
    }

    this.setState({
      slide       : !slide,
      slideContent: label
    })
  }

  /**
   * Hide content with a timeout after the content sliding animation finishes.
   */
  slowCloseSlideContent() {
    this.setState({
      slide: false
    })

    this.timeoutWatcher = setTimeout(() => {
      // Clear content
      this.setState({
        slideContent: ''
      })
    }, 500)
  }

  /**
   * Render the map.
   *
   * @returns {XML}
   */
  renderMap() {
    const observation = this.props.observation
    const image       = observation.images.images ? observation.images.images[0] : '/images/placeholder.png'
    return (
      <Map style={{height: '100%', zIndex: '0'}}
           center={{
             lat: observation.location.latitude,
             lng: observation.location.longitude
           }}
           zoom={4}>
        <Marker
          title={observation.observation_category}
          position={observation.location}
          owner_id={observation.user_id}
          show={true}>
          <div className="media callout">
            <div className="media-left mr-0">
              <img src={image}
                   alt={observation.observation_category}
                   style={{
                     width : 50,
                     height: 'auto'
                   }}/>
            </div>
            <div className="media-content">
              <div className="mb-0">
                <strong>{observation.observation_category}</strong></div>
              <div className="mb-0">By {observation.user.name}</div>
              <a href={`/observation/${observation.observation_id}`}>See full description</a>
            </div>
          </div>
        </Marker>
      </Map>
    )
  }

  /**
   * Remove observation from collection.
   *
   * @param collection
   * @param observation
   */
  removeFromCollection(collection, observation) {
    this.setState({loading: true})
    axios.delete('/web/collection/detach', {
      params: {
        collection_id : collection.id,
        observation_id: observation.observation_id
      }
    }).then(response => {
      this.setState({loading: false})
      this.props.onRemovedFromCollection(collection)
    }).catch(error => {
      console.log(error.response)
      this.setState({loading: false})
    })
  }

  /**
   * Render collection form.
   *
   * @returns {XML}
   */
  renderCollectionForm() {
    let observation = this.props.observation
    return (
      <div className="card-slide-container">
        <h3 className="title is-5">Add to Collection</h3>
        {this.state.addedToCollection ?
          <div className="content">
            <p className="text-success">
              Observation was successfully added to your collection.
            </p>

            <div className="flexbox flex-row flex-v-center flex-space-between">
              <button type="button"
                      className="button is-link is-paddingless"
                      onClick={() => this.setState({addedToCollection: false})}>
                Add to Another Collection
              </button>

              <button className="button" type="button" onClick={() => {
                this.setState({addedToCollection: false})
                this.slowCloseSlideContent()
              }}>
                Done
              </button>
            </div>
          </div> :
          <CollectionForm observationId={observation.observation_id}
                          collections={this.props.collections}
                          onSubmit={(data) => {
                            this.setState({addedToCollection: true})
                            this.props.onCollectionCreated(data)
                          }}
          />
        }

        {observation.collections.map(collection => {
          return (
            <div key={`collection_${collection.id}`}
                 className="mt-1 flexbox flex-row flex-v-center flex-space-between"
                 style={{marginBottom: '0.1rem'}}>
              <p style={{paddingRight: '5px'}}>Found in "{collection.label}"</p>
              <button onClick={() => this.removeFromCollection(collection, observation)}
                      className="button is-small is-danger is-outlined">Remove
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  /**
   * Render the content of the
   * @param label
   * @returns {*}
   */
  renderSlideContent(label) {
    let observation = this.props.observation
    switch (label) {
      case 'addToCollection':
        return this.renderCollectionForm()
        break
      case 'flag':
        return (
          <div className="card-slide-container">
            <h3 className="title is-5">Flag Observation</h3>
            <FlagForm observationId={observation.observation_id}
                      onSubmit={(data) => {
                        this.setState({flagged: true, flag_id: data.id})
                        this.props.onFlagChange('added', data)
                      }}
                      onUndo={(data) => {
                        this.setState({flagged: false, flag_id: 0})
                        this.props.onFlagChange('removed', data)
                      }}
                      flagged={this.state.flagged}
                      flagId={this.state.flag_id}/>
          </div>
        )
        break
      case 'map':
        return this.renderMap()
        break
      default:
        return null
    }
  }

  /**
   * Confirm species as correct or incorrect.
   *
   * @param correct
   * @param observation
   */
  confirm(correct, observation) {
    if (this.state.confirmation.correct === correct) {
      this.deleteConfirmation(this.state.confirmation)
      Notify.push('Unmarked observation', 'warning')
      if (correct) {
        this.setState({
          correctMarks: this.state.correctMarks - 1
        })
      }
      else {
        this.setState({
          incorrectMarks: this.state.incorrectMarks - 1
        })
      }
      return
    }

    this.setState({
      confirmation: {
        id: 0,
        correct
      }
    })

    if (this.state.confirmation.id !== -1) {
      if (this.state.confirmation.correct) {
        this.setState({correctMarks: this.state.correctMarks - 1})
      }
      else {
        this.setState({incorrectMarks: this.state.incorrectMarks - 1})
      }
    }

    axios.post('/admin/web/confirmations', {
      observation_id: observation.observation_id,
      correct
    }).then(response => {
      let confirmation = response.data.data
      this.setState({confirmation})
      let correct = confirmation.correct ? 'correct' : 'incorrect'
      Notify.push(`Marked observation as ${correct} species`, confirmation.correct ? 'success' : 'danger')
      if (confirmation.correct) {
        this.setState({
          correctMarks: this.state.correctMarks + 1
        })
      }
      else {
        this.setState({
          incorrectMarks: this.state.incorrectMarks + 1
        })
      }
    }).catch(error => {
      console.log(error.response)
    })
  }

  /**
   * Undo confirmation.
   *
   * @param confirmation
   */
  deleteConfirmation(confirmation) {
    if (confirmation.id <= 0) {
      return
    }

    this.setState({
      confirmation: {
        id     : -1,
        correct: null
      }
    })

    axios.delete(`/admin/web/confirmation/${confirmation.id}`).then(response => {
      //
    }).catch(error => {
      console.log(error.response)
    })
  }

  _renderMarks() {
    if (!this.props.showMarks) {
      return
    }

    return (
      <div className="card-footer marks-section">
        <div className="card-footer-item" style={{zIndex: 0}}>
          <span>{this.state.incorrectMarks}</span>
          <span className="icon ml-0 mr-0">
            <b className="fa fa-times text-danger"></b>
          </span>
          <span>Marks</span>
        </div>
        <div className="card-footer-item" style={{zIndex: 0}}>
          <span>{this.state.correctMarks}</span>
          <span className="icon ml-0 mr-0">
            <b className="fa fa-check text-success"></b>
          </span>
          <span>Marks</span>
        </div>
      </div>
    )
  }

  getAddress(observation) {
    let address       = observation.location.address
    let defaultObject = {
      addressLine1: '',
      addressLine2: '',
      address     : ''
    }
    if (typeof address !== 'object') {
      return defaultObject
    }

    if (Array.isArray(address)) {
      return defaultObject
    }

    if (address === null) {
      return defaultObject
    }

    address = address.formatted
    address = address.split(',')

    return {
      addressLine1: address.shift(),
      addressLine2: address.join(','),
      address
    }
  }

  render() {
    let observation  = this.props.observation
    let name         = observation.observation_category + (observation.observation_category === 'Other' ? ` (${observation.meta_data.otherLabel})` : '')
    let confirmation = this.state.confirmation

    let {address, addressLine1, addressLine2} = this.getAddress(observation)

    return (
      <div className="observation-card-container">
        <div className="card" style={{opacity: this.props.loading ? 0.1 : 1}}>
          <header className="card-header">
            <Link to={`/observation/${observation.observation_id}`}
                  className="card-header-title text-ellipsis"
                  title="Visit Observation Page">
              {name}
            </Link>

            {User.can('confirm species') ?
              <a className={`card-header-icon is-clear${confirmation.id !== -1 && !confirmation.correct ? ' is-active' : ''}`}
                 onClick={() => this.confirm(false, observation)}>
                <Tooltip label={confirmation.id !== -1 && !confirmation.correct ? 'Undo' : 'Mark as incorrect species'}
                         hideOnClick={false}>
                  <span className="icon">
                    <i className="fa fa-times"></i>
                  </span>
                </Tooltip>
              </a>
              : null}

            {User.can('confirm species') ?
              <a className={`card-header-icon is-clear${confirmation.id !== -1 && confirmation.correct ? ' is-active' : ''}`}
                 onClick={() => this.confirm(true, observation)}>
                <Tooltip label={confirmation.id !== -1 && confirmation.correct ? 'Undo' : 'Confirm species'}
                         hideOnClick={false}>
                  <span className="icon">
                    <i className="fa fa-check"></i>
                  </span>
                </Tooltip>
              </a>
              : null}
          </header>
          <div className="relative-block">
            <Spinner visible={this.state.loading}/>
            <div className="has-bg-image relative-block">
              <div className="card-image"
                   style={{
                     backgroundImage: `url(${observation.thumbnail || '/images/placeholder.png'})`
                   }}>
              </div>
            </div>

            {this._renderMarks()}

            <div className="card-content">
              <div className="content">
                {this.props.owner ? null :
                  <span>By {observation.user.name}<br/></span>}
                <a href="javascript:;" onClick={(e) => {
                  e.preventDefault()
                  this.setState({showDetailsModal: true})
                }}>
                  Quick View
                </a><br/>

                {observation.custom_id ? <div>
                  <small><strong>ID</strong> {observation.custom_id}</small><br/>
                </div> : <div style={{height: 24}}></div>}

                {this.props.owner || User.can('view accurate location') ?
                <small className="no-wrap">
                  {observation.location.latitude}, {observation.location.longitude}<br/>
                </small>
                  : null}

                <small>{moment(observation.date.date).format('MMM, D YYYY H:m A Z')}</small>
                {address !== '' ?
                  <div className="text-ellipsis" title={address}>
                    <small><b>Near</b> {addressLine1}</small>
                    <br/>
                    <small style={{marginLeft: '35px'}}>{addressLine2}</small>
                  </div>
                  :
                  <div style={{height: 48}}>Address is unavailable</div>}
              </div>
            </div>
            <div className={`card-slide-content${this.state.slide ? ' show' : ''}`}>
              <div className="p-1 relative-block">
                <button href="javascript:;"
                        className="close button"
                        type="button"
                        onClick={this.slowCloseSlideContent.bind(this)}>
                  <i className="fa fa-times"></i></button>
                {this.renderSlideContent(this.state.slideContent)}
              </div>
            </div>
          </div>
          <footer className="card-footer card-footer-z-index">
            <a href="javascript:;"
               className="card-footer-item is-paddingless"
               onClick={() => this.shouldSlide('addToCollection')}>
              <Tooltip label="Add to Collection" style={{padding: '0.75rem'}}>
                <span className="icon is-small is-marginless">
                  <i className="fa fa-star"></i>
                </span>
              </Tooltip>
            </a>

            <a href="javascript:;"
               className="card-footer-item is-paddingless"
               onClick={() => this.shouldSlide('map')}>
              <Tooltip label="Show on Map" style={{padding: '0.75rem'}}>
                <span className="icon is-small is-marginless">
                  <i className="fa fa-map"></i>
                </span>
              </Tooltip>
            </a>

            {User.can('contact users') && !this.props.owner ?
              <a href="javascript:;"
                 className="card-footer-item is-paddingless"
                 onClick={() => {
                   this.props.onEmailRequest(observation)
                 }}>
                <Tooltip label="Contact Submitter"
                         style={{padding: '0.75rem'}}>
                  <span className="icon is-small is-marginless">
                    <i className="fa fa-envelope"></i>
                  </span>
                </Tooltip>
              </a> : null}

            {this.props.owner ? null :
              <a href="javascript:;"
                 className="card-footer-item is-paddingless"
                 onClick={() => this.shouldSlide('flag')}>
                <Tooltip label="Flag as Inappropriate"
                         style={{padding: '0.75rem'}}>
                  <span className="icon is-small is-marginless">
                    <i className={`fa fa-flag${this.state.flagged ? ' text-danger' : ''}`}></i>
                  </span>
                </Tooltip>
              </a>
            }

            {!this.props.owner ? null :
              <a href={`mailto:?body=${this.createUrl(observation.observation_id)}`}
                 className="card-footer-item is-paddingless">
                <Tooltip label="Share" style={{padding: '0.75rem'}}>
                  <span className="icon is-small is-marginless">
                    <i className="fa fa-share"></i>
                  </span>
                </Tooltip>
              </a>
            }
          </footer>
        </div>
        {this.state.showDetailsModal ?
          <ObservationDetailsModal observation={observation}
                                   onCloseRequest={() => this.setState({showDetailsModal: false})}
                                   visible={true}/>
          : null}
      </div>
    )
  }

  createUrl(id) {
    let location = window.location
    if (location.port) {
      return `${location.protocol}//${location.hostname}:${location.port}/observation/${id}`
    }

    return `${location.protocol}//${location.hostname}/observation/${id}`
  }
}

ObservationCard.PropTypes = {
  observation            : PropTypes.object.isRequired,
  onFlagChange           : PropTypes.func,
  onCollectionCreated    : PropTypes.func,
  onRemovedFromCollection: PropTypes.func,
  onEmailRequest         : PropTypes.func,
  collections            : PropTypes.array,
  loading                : PropTypes.bool,
  showMarks              : PropTypes.bool,
  owner                  : PropTypes.bool
}

ObservationCard.defaultProps = {
  onFlagChange() {
  },
  onCollectionCreated(collection) {
  },
  onEmailRequest(observation) {
  },
  onRemovedFromCollection(collection) {
  },
  collections: [],
  loading    : false,
  showMarks  : false,
  owner      : false
}
