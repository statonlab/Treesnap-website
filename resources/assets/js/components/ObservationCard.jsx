import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dropdown, DropdownItem} from './Dropdown'
import moment from 'moment'

export default class ObservationCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            flipped: false
        }
    }

    render() {
        let observation = this.props.observation
        return (
            <div className="card">
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
                            {observation.observation_category}
                        </h4>
                        By {observation.user.name}<br/>
                        <a href={`/observation/${observation.observation_id}`}>See Full Details</a><br/>
                        <small>{moment(observation.date.date).format('MMM, D YYYY H:m A Z')}</small>
                    </div>
                </div>
                <footer className="card-footer">
                    <a href="javascript:;" className="card-footer-item" onClick={() => this.setState({flipped: true})}>
                        <span className="icon is-small is-marginless">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                    <a href="javascript:;" className="card-footer-item">
                        <span className="icon is-small is-marginless">
                            <i className="fa fa-flag"></i>
                        </span>
                    </a>
                    <a href="javascript:;" className="card-footer-item">
                        <span className="icon is-small is-marginless">
                            <i className="fa fa-map"></i>
                        </span>
                    </a>
                </footer>
            </div>
        )
    }
}

ObservationCard.PropTypes = {
    observation: PropTypes.object.isRequired
}