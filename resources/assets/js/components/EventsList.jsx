import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class EventsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events : [],
      loading: true
    }
  }

  componentDidMount() {
    this.loadEvents()
  }

  loadEvents() {
    axios.get(`/web/events/${this.props.limit}`).then(response => {
      this.setState({events: response.data.data, loading: false})
    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }

  renderEvent(event, key) {
    const start    = event.formatted_start_date
    const end      = event.formatted_end_date
    // event.location = event.location || ''
    return (
      <div key={key}>
        <div className="is-flex">
          <div className="item has-text-centered font-weight-light bg-warning text-small elevation-2"
               style={{flexBasis: 65, minWidth: 65, maxWidth: 65, height: 65, borderRadius: '50%'}}>
            <p style={{marginTop: 13}}><strong>{start.day} {start.month}</strong></p>
            <p>{start.year}</p>
          </div>
          <div className={'item-box elevation-1 is-lighter-dark is-flex ml-1 text-dark-muted'}>
            <div className="content">
              <p><strong>{event.title}</strong></p>
              <p>{event.description}</p>
              {event.location ?
                <div className={'text-dark-muted mb-1'}>
                  <strong>Where?</strong><br/>
                  {event.location.split('\n').map((location, index)=>{
                    return <div key={index}>{location}</div>
                  })}
                </div>
                : null}
              <div className={'text-dark-muted text-small'}>
                Event starts at {start.month}, {start.day} {start.year} {start.time}
              </div>
              {end ?
                <p className={'text-dark-muted text-small'}>
                  Event ends at {end.month}, {end.day} {end.year} {end.time}
                </p>
                : null}
              <div className={'is-flex flex-space-between'}>
                <a href={event.link} className="button is-small is-info" target={'_blank'}>
                  <i className="fa fa-facebook mr-0"></i>
                  View Event
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${event.location.split('\n').join(' ')}`}
                   className="button is-small is-primary"
                   target={'_blank'}>
                  <i className="fa fa-map-marker mr-0"></i>
                  Map It
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{maxHeight: 487, overflowY: 'auto'}} className={'invisible-scrollbar'}>
        {this.state.loading ?
          <p className="has-text-centered">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
          : null}
        {this.state.events.map(this.renderEvent.bind(this))}
        {this.state.events.length === 0 && !this.state.loading ?
          <p className="text-dark-muted">There are no upcoming events at this time</p>
          : null}
      </div>
    )
  }
}

EventsList.propTypes = {
  limit: PropTypes.number
}

EventsList.defaultProps = {
  limit: 3
}
