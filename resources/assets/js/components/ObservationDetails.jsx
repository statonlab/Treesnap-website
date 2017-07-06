import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Map from '../UI/Map'
import Marker from '../UI/Marker'
import Modal from '../UI/Modal'
import ImageGallery from 'react-image-gallery'
import moment from 'moment'

export default class ObservationDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: [],
            center : {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom   : 4
        }
    }

    componentWillMount() {
        this._setup(this.props.observation)
    }

    componentDidMount() {
        window.fixHeight()
    }

    _setup(observation) {
        if (typeof observation.location !== 'undefined') {
            observation.latitude        = observation.location.latitude
            observation.longitude       = observation.location.longitude
            observation.collection_date = moment(observation.date.date).format('LLL')
        }

        this.observation = observation

        this.setState(Object.assign({}, observation, {
            markers: [{
                image   : observation.images.images ? observation.images.images[0] : '',
                position: {
                    latitude : observation.latitude,
                    longitude: observation.longitude
                }
            }],
            center : {
                lat: observation.latitude,
                lng: observation.longitude
            },
            zoom   : 4,
            loading: false
        }))

        setTimeout(() => {
            this.map.goTo({
                lat: observation.latitude,
                lng: observation.longitude
            }, 4)
        }, 500)
    }

    _renderImage(item) {
        return (
            <div className='image-gallery-image'
                 style={{backgroundColor: this.observation.images.images.length > 1 ? '#222' : 'transparent'}}>
                <img
                    src={item.original}
                    alt="Plant Image"
                />
            </div>
        )
    }

    _renderImagesModal() {
        if (this.observation.images.images.length === 0)
            return null

        let images       = []
        let imagesObject = this.observation.images

        Object.keys(imagesObject).map(key => {
            imagesObject[key].map(image => {
                images.push({
                    original: image
                })
            })
        })

        return (
            <Modal ref={ref => this.modal = ref}>
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


    _renderControls() {
        if (this.props.showControls === false) {
            return null
        }

        return (
            <div>
                <div className="flexbox observation-tools">
                    <a className="button  is-outlined">
                        <span className="icon is-small">
                            <i className="fa fa-star text-success"></i>
                        </span>
                        <span>Add to Collection</span>
                    </a>
                    <a className="button is-outlined">
                        <span className="icon is-small">
                            <i className="fa fa-flag text-danger"></i>
                        </span>
                        <span>Flag Observation</span>
                    </a>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="box">
                <h3 className="title is-4">{this.observation.observation_category}</h3>

                <div className="columns">
                    <div className="column is-8-desktop">
                        <table className="table is-striped">
                            <tbody>
                            <tr>
                                <th style={{width: 150}}>Submitted By</th>
                                <td>{this.observation.owner}</td>
                            </tr>
                            {Object.keys(this.observation.meta_data).map((key) => {
                                return (
                                    <tr key={key}>
                                        <th>{key}</th>
                                        <td>{this.observation.meta_data[key]}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th>Date Collected</th>
                                <td>{ this.observation.collection_date }</td>
                            </tr>
                            {this.observation.images.length === 0 ? null :
                                <tr>
                                    <th>Photos</th>
                                    <td>
                                        <a href="#" onClick={(e) => {
                                            this.modal.open()
                                            if (e)
                                                e.nativeEvent.preventDefault()
                                        }}>
                                            See All Photos
                                        </a>
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </table>

                        {this._renderControls()}
                    </div>

                    <div className="column">
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
                                            key={index}
                                            position={marker.position}
                                            show={true}
                                        >
                                            {marker.image !== '' ?
                                                <div className="callout">
                                                    <img src={marker.image} alt={marker.title} style={{
                                                        width : 'auto',
                                                        height: 100
                                                    }}/>
                                                </div>
                                                : null }
                                        </Marker>
                                    )
                                })}
                            </Map>
                        </div>
                    </div>
                </div>
                {this._renderImagesModal()}
            </div>
        )
    }
}

ObservationDetails.PropTypes = {
    observation : PropTypes.object.isRequired,
    showControls: PropTypes.bool
}

ObservationDetails.defaultProps = {
    showControls: false
}