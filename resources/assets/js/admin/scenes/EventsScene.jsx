import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Path from '../../helpers/Path'
import EventForm from '../components/EventForm'
import Errors from '../../helpers/Errors'
import Notify from '../../components/Notify'

export default class EventsScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading       : true,
      events        : [],
      page          : 1,
      next_page     : null,
      prev_page     : null,
      per_page      : 6,
      has_more_pages: false,
      total         : 0,
      showEventFrom : false,
      selectedEvent : null
    }
  }

  componentDidMount() {
    let state    = this.state
    const params = Path.parseUrl(this.props.location.search)

    if (params.page) {
      state.page = parseInt(params.page)
      if (isNaN(state.page)) {
        state.page = 1
      }
    }

    if (params.per_page) {
      state.per_page = parseInt(params.per_page)
      if (isNaN(state.per_page)) {
        state.per_page = 6
      }
    }

    this.setState(state)

    this.loadEvents(state)
  }

  loadEvents(state) {
    axios.get('/admin/web/events', {
      params: {
        page    : state.page,
        per_page: state.per_page
      }
    }).then(response => {
      response = response.data.data
      this.setState({
        loading  : false,
        events   : response.data,
        next_page: response.next_page_url ? response.current_page + 1 : null,
        prev_page: response.prev_page_url ? response.current_page - 1 : null,
        total    : response.total,
        page     : response.current_page
      })
    }).catch(error => {
      if (error.response) {
        alert(error.response)
      }
      console.log(error)
    })
  }

  goTo(page) {
    let state = this.state
    this.setState({page, loading: true})
    state.page = page
    this.props.history.push(`/events?page=${page}`)
    if (typeof window.scrollTo !== 'undefined') {
      window.scrollTo(0, 0)
    }
    this.loadEvents(state)
  }

  delete(event) {
    if (!confirm('Are you sure you want to delete ' + event.title + '?')) {
      return
    }

    axios.delete(`/admin/web/event/${event.id}`).then(response => {
      if (this.state.events.length === 1 && this.state.page > 1) {
        this.goBack()
        return
      }
      this.loadEvents(this.state)
    }).catch(error => {
      let errors = new Errors(error)
      if (errors.has('general')) {
        alert(error.first('general'))
      }
    })
  }

  renderEvent(event, key) {
    const start    = event.formatted_start_date
    const end      = event.formatted_end_date
    event.location = event.location || ''

    return (
      <div key={key} className={'column is-4'}>
        <div className="card card-equal-height">
          <header className="card-header">
            <h3 className="card-header-title" title={event.title}>
              {event.title}
            </h3>
          </header>
          <section className="card-content content mb-none p-0">
            <strong>Description</strong>
            <p>{event.description}</p>

            {event.location.length > 0 ? <strong>Location</strong> : null}
            <div className={'mb-1'}>
              {event.location.split('\n').map((address, key) => {
                return <div key={key}>{address}</div>
              })}
            </div>

            <strong>Dates</strong>
            <div className={'mb-1'}>
              Starts {start.month}, {start.day} {start.year} {start.time}
              {end ? <br/> : null}
              {end ? <span>Ends {end.month}, {end.day} {end.year} {end.time}</span> : null}
            </div>

            <strong>Created By</strong><br/>
            <Link to={`/user/${event.user.id}`}>{event.user.name}</Link>

            <div className="is-flex mb-none mt-1">
              {event.link ?
                <a href={event.link}
                   className={'button is-small is-info'}>
                  <i className={`fa fa-${event.platform.toLowerCase()} mr-0`}></i>
                  View Event{event.platform ? ` on ${event.platform}` : ''}
                </a>
                : null}

              {event.location ?
                <a href={`https://www.google.com/maps/search/?api=1&query=${event.location.split('\n').join(' ')}`}
                   className={'button is-small is-success ml-auto'}>
                  <i className="fa fa-map-marker mr-0"></i>
                  Map it
                </a>
                : null}
            </div>
          </section>
          <footer className="card-footer">
            <a href="javascript:void(0);" className="card-footer-item" onClick={() => this.openEventsModal(event)}>
              <i className="fa fa-edit mr-0"></i>
              Edit
            </a>
            <a href="javascript:void(0);" className="card-footer-item text-danger" onClick={() => this.delete(event)}>
              <i className="fa fa-trash mr-0"></i>
              Delete
            </a>
          </footer>
        </div>
      </div>
    )
  }

  renderEvents() {
    if (this.state.events.length > 0) {
      return (
        <div className="columns is-multiline">
          {this.state.events.map(this.renderEvent.bind(this))}
        </div>
      )
    }

    if (!this.state.loading) {
      return (
        <div className="box">
          <p>There are no events added at this time. Please use the button above to create a new event.</p>
        </div>
      )
    }

    return null
  }

  goBack() {
    if (this.state.prev_page === null) {
      return
    }

    this.goTo(this.state.prev_page)
  }

  goForward() {
    if (this.state.next_page === null) {
      return
    }

    this.goTo(this.state.next_page)
  }

  getPages() {
    let num   = Math.ceil(this.state.total / this.state.per_page)
    let pages = []
    for (let i = 1; i <= num; ++i) {
      pages.push(i)
    }

    return pages
  }

  renderPaginator() {
    if (this.state.per_page > this.state.total) {
      return null
    }

    const pages = this.getPages()

    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <button type="button"
                className="pagination-previous"
                onClick={() => this.goBack()}
                disabled={this.state.prev_page === null}>
          Previous
        </button>
        <button type="button"
                className="pagination-next"
                onClick={() => this.goForward()}
                disabled={this.state.next_page === null}>
          Next page
        </button>
        <ul className="pagination-list">
          {pages.map((page, key) => {
            return (
              <li key={key}>
                <button type="button"
                        className={`pagination-link${this.state.page === page ? ' is-current' : ''}`}
                        aria-label={`Go to page ${page}`}
                        title={`Go to page ${page}`}
                        onClick={() => {
                          this.goTo(page)
                        }}>
                  {page}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  openEventsModal(event) {
    this.setState({
      showEventFrom: true,
      selectedEvent: event
    })
  }

  closeEventsModal() {
    this.setState({
      selectedEvent: null,
      showEventFrom: false
    })
  }

  renderEventForm() {
    if (this.state.showEventFrom === false) {
      return null
    }

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <div className="is-flex">
              <h3 className="title is-4">{this.state.selectedEvent ? 'Edit Event' : 'Create New Event'}</h3>
              <button type="button" className="delete ml-auto" onClick={this.closeEventsModal.bind(this)}></button>
            </div>
            <EventForm
              onSubmit={event => {
                this.loadEvents(this.state)
                this.closeEventsModal()
                Notify.push(`Event "${event.title}" was created successfully`)
              }}
              onUpdate={event => {
                this.loadEvents(this.state)
                this.closeEventsModal()
                Notify.push(`Event "${event.title}" was updated successfully`)
              }}
              event={this.state.selectedEvent}
              onCancel={this.closeEventsModal.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="is-flex">
          <h1 className="title is-3">Events</h1>
          <div className="ml-auto">
            <button className="button is-primary" type="button" onClick={() => this.openEventsModal(null)}>
              <span className="icon is-small">
                <i className="fa fa-plus"></i>
              </span>
              <span>Create Event</span>
            </button>
          </div>
        </div>
        {this.renderEvents()}
        {this.renderPaginator()}
        {this.renderEventForm()}
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}
