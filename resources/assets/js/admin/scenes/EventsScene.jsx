import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Path from '../../helpers/Path'

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
      total         : 0
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

  renderEvent(event, key) {
    const start = event.formatted_start_date
    const end   = event.formatted_end_date

    return (
      <div key={key} className={'column is-4'}>
        <div className="card card-equal-height">
          <header className="card-header">
            <h3 className="card-header-title">
              <Link to={`event/${event.id}`} title={event.title}>{event.title}</Link>
            </h3>
          </header>
          <section className="card-content content mb-none">
            <strong>Description</strong>
            <p>{event.description}</p>

            <strong>Location</strong>
            <div className={'mb-1'}>
              {event.location.split('\n').map((address, key) => {
                return <div key={key}>{address}</div>
              })}
            </div>

            <strong>Dates</strong>
            <div>
              Starts {start.month}, {start.day} {start.year} {start.time}
              {end ? <br/> : null}
              {end ? <span>Ends {end.month}, {end.day} {end.year} {end.time}</span> : null}
            </div>
          </section>
          <footer className="card-footer">
            <a href="#" className="card-footer-item">
              <i className="fa fa-edit mr-0"></i>
              Edit
            </a>
            <a href="#" className="card-footer-item text-danger">
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

  render() {
    return (
      <div>
        <div className="is-flex">
          <h1 className="title is-3">Events</h1>
          <div className="ml-auto">
            <button className="button is-primary" type="button">
              <span className="icon is-small">
                <i className="fa fa-plus"></i>
              </span>
              <span>Create Event</span>
            </button>
          </div>
        </div>
        {this.renderEvents()}
        {this.renderPaginator()}
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}
