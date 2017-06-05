import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dropdown, DropdownItem} from './Dropdown'
import Tooltip from './Tooltip'
import moment from 'moment'
import CollectionForm from './CollectionForm'
import FlagForm from './FlagForm'
import Map from '../UI/Map'
import Marker from '../UI/Marker'

export default class ObservationCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slide       : false,
            slideContent: ''
        }

        this.timeoutWatcher = null
    }

    /**
     * Determine if the content page should show or hide.
     *
     * @param label
     */
    shouldSlide(label) {
        let oldLabel = this.state.slideContent
        let slide    = this.state.slide

        //console.log(this.state, label)

        if (this.timeoutWatcher) {
            clearTimeout(this.timeoutWatcher)
        }

        // Clicked twice on the same pane
        if (oldLabel === label) {
            this.slowCloseSlideContent()

            return
        } else if (slide) {
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

    renderMap() {
        const observation = this.props.observation
        const image = observation.images.images ? observation.images.images[0] : '/images/placeholder.png'
        return (
            <Map style={{height: '100%', zIndex: '0'}}
                 center={{
                     lat: observation.location.latitude,
                     lng: observation.location.longitude
                 }}
                 zoom={18}>
                <Marker
                    title={observation.observation_category}
                    position={observation.location}
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
                            <div className="mb-0"><strong>{observation.observation_category}</strong></div>
                            <div className="mb-0">By {observation.user.name}</div>
                            <a href={`/observation/${observation.observation_id}`}>See full description</a>
                        </div>
                    </div>
                </Marker>
            </Map>
        )
    }

    renderSlideContent(label) {
        switch (label) {
            case 'addToCollection':
                return (
                    <div>
                        <h3 className="title is-5">Add to Collection</h3>
                        <CollectionForm observationId={this.props.observation.observation_id}
                                        collections={[{label: 'Favorites', value: 1}]}/>
                    </div>
                )
                break
            case 'flag':
                return (
                    <div>
                        <h3 className="title is-5">Flag Observation</h3>
                        <FlagForm observationId={this.props.observation.observation_id}/>
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

    render() {
        let observation = this.props.observation
        let name = observation.observation_category + (observation.observation_category === 'Other' ? `(${observation.meta_data.otherLabel})` : '')
        return (
            <div className="card">
                <div className="relative-block">
                    <div className="has-bg-image">
                        <div className="card-image"
                             style={{
                                 backgroundImage: `url(${observation.images.images[0] || '/images/placeholder.png'})`
                             }}>
                            <Dropdown right={true} className="is-pulled-right">
                                <a className="card-header-icon">
                                    <span className="icon">
                                        <i className="fa fa-angle-down"></i>
                                    </span>
                                </a>
                                <DropdownItem onClick={() => console.log('hi')}>Contact Submitter</DropdownItem>
                                <DropdownItem onClick={() => console.log('hi')}>Add to a Collection</DropdownItem>
                                <DropdownItem onClick={() => console.log('hi')}>Report an Issue</DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h4 className="title is-4">
                                {name}
                            </h4>
                            By {observation.user.name}<br/>
                            <a href={`/observation/${observation.observation_id}`}>See Full Details</a><br/>
                            <small>{moment(observation.date.date).format('MMM, D YYYY H:m A Z')}</small>
                        </div>
                    </div>
                    <div className={`card-slide-content${this.state.slide ? ' show' : ''}`}>
                        <div className="p-1 relative-block">
                            <button className="close button"
                                    type="button"
                                    onClick={this.slowCloseSlideContent.bind(this)}>
                                <i className="fa fa-times"></i></button>
                            {this.renderSlideContent(this.state.slideContent)}
                        </div>
                    </div>
                </div>
                <footer className="card-footer">
                    <a href="javascript:;"
                       className="card-footer-item is-paddingless"
                       onClick={() => this.shouldSlide('addToCollection')}>
                        <Tooltip label="Add to Collection" style={{padding: '0.75rem'}}>
                            <span className="icon is-small is-marginless">
                                <i className="fa fa-plus"></i>
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
                    <a href="javascript:;"
                       className="card-footer-item is-paddingless"
                       onClick={() => this.shouldSlide('flag')}>
                        <Tooltip label="Flag as Inappropriate" style={{padding: '0.75rem'}}>
                            <span className="icon is-small is-marginless">
                                <i className="fa fa-flag"></i>
                            </span>
                        </Tooltip>
                    </a>
                </footer>
            </div>
        )
    }
}

ObservationCard.PropTypes = {
    observation: PropTypes.object.isRequired
}