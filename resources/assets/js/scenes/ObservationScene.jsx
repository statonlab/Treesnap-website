import '../bootstrap'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from '../UI/Map'
import Marker from '../UI/Marker'
import Modal from '../UI/Modal'
import ImageGallery from 'react-image-gallery'

export default class ObservationScene extends Component {
    constructor(props) {
        super(props)
        this.id = window.Laravel.observationID

        this.state = {
            observation_category: '',
            owner               : '',
            meta_data           : {},
            latitude            : 0,
            longitude           : 0,
            markers             : [],
            images              : [],
            center              : {
                lat: 40.354388,
                lng: -95.998237
            },
            zoom                : 11
        }
    }

    componentDidMount() {
        axios.get(`/web/observation/${this.id}`).then(response => {
            let data = response.data.data
            this.setState(
                Object.assign(data, {
                    markers: [{
                        image   : data.images.length > 0 ? data.images[0] : '',
                        position: {
                            latitude : data.latitude,
                            longitude: data.longitude
                        },
                    }],
                    center : {
                        lat: data.latitude,
                        lng: data.longitude
                    },
                    zoom   : 20
                })
            )

            setTimeout(() => {
                this.map.goTo({
                    lat: data.latitude,
                    lng: data.longitude
                }, 20)
            }, 500)

        }).catch(error => {
            //alert("Could not obtain data from the server. Please contact the web admin.")
        })
    }

    _renderImage(item) {
        return (
            <div className='image-gallery-image'
                 style={{backgroundColor: this.state.images.length > 1 ? '#222' : 'transparent'}}>
                <img
                    src={item.original}
                    alt="Plant Image"
                    style={{height: window.innerHeight * .9, width: 'auto'}}
                />
            </div>
        )
    }

    _renderImagesModal() {
        if (this.state.images.length === 0)
            return null

        let images = []

        this.state.images.map(image => {
            images.push({
                original: image
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

    render() {
        return (
            <div className="container">
                {this._renderImagesModal()}
                <div className="box">
                    <h3 className="title is-4">{ this.state.observation_category }</h3>
                    <div className="columns">
                        <div className="column is-8-desktop">
                            <table className="table is-striped">
                                <tbody>
                                <tr>
                                    <th style={{width: 150}}>Submitted By</th>
                                    <td>{ this.state.owner }</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>
                                        {this.state.latitude}, {this.state.longitude} with accuracy
                                        of {this.state.location_accuracy } meters.
                                    </td>
                                </tr>
                                {
                                    Object.keys(this.state.meta_data).map((key) => {
                                        return (
                                            <tr key={key}>
                                                <th>{key}</th>
                                                <td>{this.state.meta_data[key]}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <th>Date Collected</th>
                                    <td>{ this.state.collection_date }</td>
                                </tr>
                                {this.state.images.length === 0 ? null :
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
                        </div>

                        <div className="column">
                            <div style={{height: '300px', width: '100%', position: 'relative'}}>
                                <Map
                                    ref={ref => this.map = ref}
                                    style={{height: '300px'}}
                                    center={this.state.center}
                                    zoom={this.state.zoom}
                                    onBoundsChange={(bounds) => {}}
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
                </div>
            </div>
        )
    }
}
