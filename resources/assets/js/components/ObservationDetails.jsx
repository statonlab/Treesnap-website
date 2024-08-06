import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Map from './Map'
import Marker from './Marker'
import Modal from './Modal'
import ImageGallery from 'react-image-gallery'
import moment from 'moment'
import BoxModal from './BoxModal'
import FlagFrom from './FlagForm'
import CollectionForm from './CollectionForm'
import Labels from '../helpers/Labels'
import Utils from '../helpers/Utils'
import User from '../helpers/User'
import EventEmitter from '../helpers/EventEmitter'
import { Link } from 'react-router-dom'
import EmailModal from '../admin/components/EmailModal'
import ShareLinkModal from './ShareLinkModal'
import ObservationDetailsModal from './ObservationDetailsModal'
import Tooltip from "./Tooltip";
import Notify from "./Notify";

export default class ObservationDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab          : 'photos',
      markers            : [],
      center             : {
        lat: 40.354388,
        lng: -95.998237,
      },
      zoom               : 4,
      showControlModal   : false,
      showShareLinkModal : false,
      controlModalContent: '',
      collections        : [],
      showModal          : false,
      deleted            : false,
      showEmail          : false,
      contact            : {
        to  : {
          user_id: 0,
          name   : '',
        },
        from: '',
      },
      selectedUnit       : window.TreeSnap.units || 'US',
      observation        : null,
      confirmation      : {
        id     : -1,
        correct: null,
      },
    }
  }

  /**
   * Set up the observation state.
   */
  componentDidMount() {
    const observation = this.props.observation
    this._setup(observation)

    if (User.can('contact users')) {
      axios.get('/web/user').then(response => {
        let user    = response.data.data
        let contact = {
          from: user.email,
          to  : {
            user_id: observation.user.id,
            name   : observation.user.name,
          },
        }
        this.setState({contact})
      }).catch(error => {
        console.log(error)
      })
    }

    if (window.fixHeight) {
      window.fixHeight()
    }
    this.loadCollections()

    if (observation.confirmations.length > 0) {
      this.setState({
        confirmation: observation.confirmations[0],
      })
    }

    this.loadMarks()
  }

  /**
   * If the observation changes, reset the observation state.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.observation !== this.props.observation) {
      this._setup(this.props.observation)
    }
  }

  loadMarks() {
    let observation = this.props.observation
    if (typeof observation.correct_marks !== 'undefined' && typeof observation.incorrect_marks !== 'undefined') {
      this.setState({
        correctMarks  : observation.correct_marks,
        incorrectMarks: observation.incorrect_marks,
      })
      return
    }

    let id = this.props.observation.observation_id

    axios.get(`/web/confirmations/count/${id}`).then(response => {
      let data = response.data.data
      this.setState({
        correctMarks  : data.correct,
        incorrectMarks: data.incorrect,
      })
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Load all collections that a user has created.
   */
  loadCollections() {
    if (!this.props.showControls) {
      return
    }

    axios.get('/web/collections/customizable/1').then(response => {
      let collections = response.data.data
      this.setState({collections})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Set up the state.
   */
  _setup(observation) {
    if (typeof observation.location !== 'undefined') {
      observation.latitude        = observation.location.latitude
      observation.longitude       = observation.location.longitude
      observation.collection_date = moment(observation.date).format('LLL')
    }

    this.setState({
      markers    : [{
        user_id : observation.user_id,
        image   : observation.images.images ? observation.images.images[0] : '',
        position: {
          latitude : observation.latitude,
          longitude: observation.longitude,
        },
      }],
      center     : {
        lat: observation.latitude,
        lng: observation.longitude,
      },
      zoom       : 4,
      loading    : false,
      collections: this.state.collections,
      observation,
    })

    setTimeout(() => {
      if (!this.map) {
        return
      }

      this.map.goTo({
        lat: observation.latitude,
        lng: observation.longitude,
      }, 4)
    }, 500)
  }

  /**
   * Render each image for the image gallery.
   */
  _renderImage(item, inline) {
    if (typeof inline === 'undefined') {
      inline = false
    }

    const keyMap = {
      images : 'General Photo',
      seeds  : 'Seed Photo',
      flowers: 'Flower Photo',
    }

    const {observation} = this.state

    return (
      <div className={'image-gallery-image' + (inline ? ' max-h-90vh' : '')}
           style={{
             backgroundColor: observation.images.images.length > 1 ? '#222' : 'transparent',
             position       : 'relative',
           }}>
        <img
          src={item.original}
          alt="Plant Image"
        />
        <div style={{
          position: 'absolute',
          bottom  : 0,
          left    : 0,
          right   : 0,
          // backgroundColor: 'rgba(0,0,0,.5)',
          color     : '#fff',
          textAlign : 'center',
          padding   : '20px',
          background: 'linear-gradient(rgba(0,0,0,0), #000)',
        }}>
          {typeof keyMap[item.key] !== 'undefined' ? keyMap[item.key] : item.key}
        </div>
      </div>
    )
  }

  getImages() {
    const {observation} = this.state
    let images          = []
    let imagesObject    = observation.images

    Object.keys(imagesObject).map(key => {
      imagesObject[key].map(image => {
        images.push({
          original: image,
          key,
        })
      })
    })

    return images
  }

  /**
   * Render the images modal
   */
  _renderImagesModal() {
    const {observation} = this.state
    if (!this.state.showModal || observation.images.images.length === 0) {
      return null
    }

    let images = this.getImages()

    return (
      <Modal onCloseRequest={() => this.setState({showModal: false})}>
        <ImageGallery
          items={images}
          slideInterval={2000}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          renderItem={this._renderImage.bind(this)}
        />
      </Modal>
    )
  }


  /**
   * Render the card control buttons.
   */
  _renderControls() {
    if (this.props.showControls === false) {
      return null
    }

    const {observation} = this.state
    let confirmation = this.state.confirmation

    return (
      <div>
        <div className="flexbox observation-tools">
          <a className="button is-outlined"
             onClick={() => this.setState({controlModalContent: 'collection', showControlModal: true})}>
            <span className="icon is-small">
              <i className="fa fa-star text-success"></i>
            </span>
            <span>Add to Collection</span>
          </a>
          {User.owns(observation) ?
            <a className="button is-outlined"
               onClick={() => this.setState({showShareLinkModal: true})}>
              <span className="icon is-small">
                <i className="fa fa-share text-success"></i>
              </span>
              <span>Share Link</span>
            </a> : null}
          {observation.flags.length === 0 ?
            <a className="button is-outlined"
               onClick={() => this.setState({controlModalContent: 'flag', showControlModal: true})}>
              <span className="icon is-small">
                <i className="fa fa-flag text-danger"></i>
              </span>
              <span>Flag Observation</span>
            </a>
            : null}
          {User.can('contact users') ?
            <a className="button is-outlined"
               onClick={() => this.setState({showEmail: true})}>
              <span className="icon is-small">
                <i className="fa fa-envelope text-info"></i>
              </span>
              <span>Contact Submitter</span>
            </a>
            : null}
          {User.can('confirm species') ?
              <a className={`button is-outlined is-clear${confirmation.id !== -1 && !confirmation.correct ? ' is-active' : ''}`}
                  onClick={() => this.confirm(false, observation)} >
                  <Tooltip label={confirmation.id !== -1 && !confirmation.correct ? 'Undo' : 'Mark as incorrect species'}
                           hideOnClick={false}>
                      <span>{this.state.incorrectMarks}</span>
                      <span className="icon is-small mr-1">
                          <b className="fa fa-times text-danger"></b>
                      </span>
                  <span>Marks</span>
                  </Tooltip>
              </a> :
              <div className={`disabled`}>
                  <span>{this.state.incorrectMarks}</span>
                  <span className="icon is-small ml-1 mr-1">
                          <b className="fa fa-times text-danger"></b>
                      </span>
                  <span>Marks</span>
              </div>}
            {User.can('confirm species') ?
                <a className={`button is-outlined is-clear${confirmation.id !== -1 && confirmation.correct ? ' is-active' : ''}`}
                   onClick={() => this.confirm(true, observation)}>
                  <Tooltip label={confirmation.id !== -1 && confirmation.correct ? 'Undo' : 'Confirm species'}
                           hideOnClick={false}>
                    <span>{this.state.correctMarks}</span>
                    <span className="icon is-small mr-1">
                          <b className="fa fa-check text-success"></b>
                      </span>
                    <span>Marks</span>
                  </Tooltip>
                </a> :
                <div className={`disabled`} >
                  <span>{this.state.correctMarks}</span>
                  <span className="icon is-small ml-1 mr-1">
                          <b className="fa fa-check text-success"></b>
                      </span>
                  <span>Marks</span>
                </div>}
        </div>

        {this._renderControlModal()}

      </div>
    )
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
          correctMarks: this.state.correctMarks - 1,
        })
      } else {
        this.setState({
          incorrectMarks: this.state.incorrectMarks - 1,
        })
      }
      return
    }

    this.setState({
      confirmation: {
        id: 0,
        correct,
      },
    })

    if (this.state.confirmation.id !== -1) {
      if (this.state.confirmation.correct) {
        this.setState({correctMarks: this.state.correctMarks - 1})
      } else {
        this.setState({incorrectMarks: this.state.incorrectMarks - 1})
      }
    }

    axios.post('/admin/web/confirmations', {
      observation_id: observation.observation_id,
      correct,
    }).then(response => {
      let confirmation = response.data.data
      this.setState({confirmation})
      let correct = confirmation.correct ? 'correct' : 'incorrect'
      Notify.push(`Marked observation as ${correct} species`, confirmation.correct ? 'success' : 'danger')
      if (confirmation.correct) {
        this.setState({
          correctMarks: this.state.correctMarks + 1,
        })
      } else {
        this.setState({
          incorrectMarks: this.state.incorrectMarks + 1,
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
        correct: null,
      },
    })

    axios.delete(`/admin/web/confirmation/${confirmation.id}`).then(response => {
      //
    }).catch(error => {
      console.log(error.response)
    })
  }

  /**
   * Render the control modal where users can add the
   * observation to a collection, flag it, etc.
   * @returns {{}}
   * @private
   */
  _renderControlModal() {
    return (
      <BoxModal
        visible={this.state.showControlModal}
        onCloseRequest={() => this.setState({showControlModal: false})}>
        {this.state.controlModalContent === 'flag' ? this._renderFlagForm() : null}
        {this.state.controlModalContent === 'collection' ? this._renderCollectionForm() : null}
      </BoxModal>
    )
  }

  /**
   * Render the flagging form.
   *
   * @returns {XML}
   * @private
   */
  _renderFlagForm() {
    return (
      <FlagFrom observationId={this.state.observation.observation_id}
                onSubmit={(flag) => {
                  this.props.onFlagCreated(flag)
                  this.setState({showControlModal: false})
                }}/>
    )
  }

  /**
   * Render the collection form.
   *
   * @returns {XML}
   * @private
   */
  _renderCollectionForm() {
    return (
      <div>
        <h3 className="title is-4">Add to Collection</h3>
        <CollectionForm observationId={this.state.observation.observation_id}
                        collections={this.state.collections}
                        onSubmit={(collection) => {
                          this.props.onAddedToCollection(collection)
                          this.setState({showControlModal: false})
                        }}/>
      </div>
    )
  }

  /**
   * Decode meta data.
   *
   * @param label
   * @param data
   * @param key
   * @param unit
   * @returns {XML}
   * @private
   */
  _renderMetaData(label, data, key, unit) {
    if (Utils.isJson(data) === true) {
      data = JSON.parse(data)
      if (Array.isArray(data)) {
        data = data.join(', ')
      } else if (typeof data === 'object') {
        data = Object.keys(data).map(key => {
          return data[key]
        }).join(', ')
      }
    }

    if (typeof data.trim === 'function') {
      if (data.trim().length === 0) {
        return null
      }
    }

    return (
      <tr key={key}>
        <th>{label}</th>
        <td>
          {data} {unit ? unit : ''}{key === 'comment' && this.props.observation.has_private_comments ?
          <p className="help">
            <span className="icon is-small">
              <i className="fa fa-lock"></i>
            </span>
            <span>Only you can see this comment</span>
          </p>
          : null}
        </td>
      </tr>
    )
  }

  _renderCategoryClicker(label, data, key) {
    return (
        <tr key={key}>
          <th>{label}</th>
          <td>
            {data[key].categories.map(this._renderCategory.bind(this, [data[key]]))}
          </td>
        </tr>
    )
  }

  _renderCategory(data, label, index) {
    return (
        <span key={index}>{data[0].counts[index] + ' ' + label}<br/></span>
    )
  }

  destroy(observation) {
    if (!confirm('Are you sure you want to delete this observation? This action cannot be undone.')) {
      return
    }

    axios.delete(`/web/observation/${observation.observation_id}`).then(response => {
      this.setState({deleted: true})

      EventEmitter.emit('observation_deleted')
    }).catch(error => {
      if (error.response) {
        let status = error.response.status
        if (status === 500) {
          alert('Server error. Please try again later.')
          return
        }

        if (status === 401 || status === 403) {
          alert('You are unauthorized to delete this observation.')
          return
        }

        alert(error.response.data)
        return
      }

      alert('Unknown error occurred. Please contact us to fix this issue.')
    })
  }

  deleted() {
    return (
      <div className="box has-text-centered">
        <div className="content">
          <h4 className="title is-4">Observation Deleted</h4>
          <p>Observation has been deleted successfully</p>
          <Link to="/" className="button is-primary">Back to Home Page</Link>
        </div>
      </div>
    )
  }

  renderEmailModal() {
    if (!User.can('contact users')) {
      return null
    }

    return (
      <EmailModal
        visible={this.state.showEmail}
        contact={this.state.contact}
        observation={this.state.observation}
        onCloseRequest={() => {
          this.setState({showEmail: false})
        }}
      />
    )
  }

  /**
   * Get tab link classes
   * @param tab
   * @return {string}
   */
  getTabClass(tab) {
    if (tab === this.state.activeTab) {
      return 'is-active'
    }

    return ''
  }

  getAccuracy() {
    if (parseInt(this.state.observation.location.accuracy) === -2) {
      return 'Entered manually by the user'
    }

    if (User.can('view accurate location') || User.owns(this.state.observation)) {
      return 'Within ' + this.state.observation.location.accuracy + ' meter radius'
    }

    return 'Within 5 miles radius'
  }

  render() {
    if (this.state.deleted) {
      return this.deleted()
    }

    if (!this.state.observation) {
      return null
    }

    let data = this.state.observation.meta_data

    return (
      <div className="box">
        <div className="columns is-mobile flex-v-center">
          <div className={"column"}>
            <h3 className="title is-4">{this.state.observation.observation_category}</h3>
          </div>
          <div className="column is-narrow">
            <span className="select">
              <select value={this.state.selectedUnit} onChange={({target}) => {
                window.units = target.value
                this.setState({selectedUnit: target.value})
              }}>
                <option value="US">US Units</option>
                <option value="metric">Metric Units</option>
              </select>
            </span>
          </div>
          {User.can('delete observations') || User.owns(this.state.observation) ?
            <div className="column is-narrow">
              <button type="button"
                      className="button is-outlined is-danger"
                      onClick={() => this.destroy(this.state.observation)}>
                <span className="icon is-small">
                  <i className="fa fa-trash"></i>
                </span>
                <span>Delete</span>
              </button>
            </div>
            : null}
        </div>

        <div className="columns mb-none">
          <div className="column is-8-desktop" style={{minHeight: '300px'}}>
            <div className="flexbox flex-column flex-space-between" style={{minHeight: '300px'}}>
              <table className="table is-striped" style={{tableLayout: 'fixed'}}>
                <tbody>
                <tr>
                  <th>Submitted By</th>
                  <td>{this.state.observation.user.name}</td>
                </tr>

                {this.state.observation.custom_id ?
                  <tr>
                    <th>Custom Tree Identifier</th>
                    <td>{this.state.observation.custom_id}</td>
                  </tr> : null}

                {this.state.observation.mobile_id ?
                  <tr>
                    <th>ID</th>
                    <td>{this.state.observation.mobile_id}</td>
                  </tr>
                  : null}

                {Object.keys(data).map(key => {
                  if (key.indexOf('_values') > -1 || key.indexOf('_units') > -1 || key.indexOf('_confidence') > -1) {
                    return null
                  }

                  let unit    = null
                  const label = typeof Labels[key] !== 'undefined' ? Labels[key] : key
                  let val     = data[key]
                  if (typeof data[`${key}_values`] !== 'undefined') {
                    unit = data[`${key}_values`][`${this.state.selectedUnit}_unit`]
                    val  = data[`${key}_values`][`${this.state.selectedUnit}_value`]
                  }

                  if (data[key].category_clicker) {
                    return this._renderCategoryClicker(label, data, key)
                  }

                  return this._renderMetaData(label, val, key, unit)
                })}

                {this.state.observation.location.address && this.state.observation.location.address.formatted ?
                  <tr>
                    <th>Address</th>
                    <td>{this.state.observation.location.address.formatted}</td>
                  </tr>
                  : null}

                <tr>
                  <th>Coordinates</th>
                  <td>{this.state.observation.location.latitude}, {this.state.observation.location.longitude}</td>
                </tr>

                {this.state.observation.location.accuracy ?
                  <tr>
                    <th>Location Accuracy</th>
                    <td>{this.getAccuracy()}</td>
                  </tr>
                  : null}

                <tr>
                  <th>Date Collected</th>
                  <td>{this.state.observation.collection_date}</td>
                </tr>
                {this.state.observation.images.length === 0 ? null :
                  <tr>
                    <th>Photos</th>
                    <td>
                      <a onClick={() => this.setState({showModal: true})}>
                        See All Photos
                      </a>
                    </td>
                  </tr>
                }
                </tbody>
              </table>

              {this._renderControls()}
            </div>
          </div>

          <div className="column">
            <div className="tabs has-no-shadow">
              <ul>
                <li className={this.getTabClass('photos')}>
                  <a onClick={() => this.setState({activeTab: 'photos'})}>Photos</a>
                </li>
                <li className={this.getTabClass('map')}>
                  <a onClick={() => this.setState({activeTab: 'map'})}>
                    Map
                  </a>
                </li>
              </ul>
            </div>

            {this.state.activeTab === 'map' ?
              <div style={{height: '300px', width: '100%', position: 'relative'}}>
                <Map
                  ref={ref => this.map = ref}
                  style={{height: '300px'}}
                  center={this.state.center}
                  zoom={this.state.zoom}
                >
                  {this.state.markers.map((marker, index) => {
                    return (
                      <Marker
                        owner_id={marker.user_id}
                        key={index}
                        position={marker.position}
                        show={true}
                      >
                        {marker.image !== '' ?
                          <div className="callout">
                            <img src={marker.image} alt={marker.title} style={{
                              width : 'auto',
                              height: 100,
                            }}/>
                          </div>
                          : null}
                      </Marker>
                    )
                  })}
                </Map>
              </div>
              : null}

            {this.state.activeTab === 'photos' ?
              <div style={{width: '100%', position: 'relative'}}>
                <ImageGallery
                  items={this.getImages()}
                  slideInterval={2000}
                  showThumbnails={false}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  renderItem={this._renderImage.bind(this)}
                />
              </div>
              : null}
          </div>
        </div>
        {this._renderImagesModal()}
        {this.renderEmailModal()}
        {this.state.showShareLinkModal ?
          <ShareLinkModal observationID={this.props.observation.observation_id}
                          onCloseRequest={() => this.setState({showShareLinkModal: false})}
                          visible={true}/>
          : null}
      </div>
    )
  }
}

ObservationDetails
  .propTypes = {
  observation        : PropTypes.object.isRequired,
  showControls       : PropTypes.bool,
  onAddedToCollection: PropTypes.func,
  onFlagCreated      : PropTypes.func,
}

ObservationDetails
  .defaultProps = {
  showControls: false,
  onFlagCreated(flag) {
  },
  onAddedToCollection(collection) {
  },
}
