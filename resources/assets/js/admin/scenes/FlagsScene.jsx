import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Dropdown from '../../components/Dropdown'
import Spinner from '../../components/Spinner'
import Scene from '../../scenes/Scene'

export default class FlagsScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      flags         : [],
      page          : 0,
      per_page      : 10,
      total         : 0,
      has_more_pages: false,
      loading       : true
    }
  }

  componentDidMount() {
    this.loadFlags()
  }

  loadFlags() {
    this.setState({loading: true})
    axios.get('/admin/web/flags', {
      params: {
        page: this.state.page
      }
    }).then(response => {
      let {data} = response.data
      this.setState({
        flags         : data.data,
        total         : data.total,
        page          : data.current_page,
        per_page      : data.per_page,
        has_more_pages: data.next_page_url !== null,
        loading       : false
      })

      window.scrollTo(0, 0)
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  clearFlag(flag) {
    if (!confirm('Are you sure you want to delete this flag? This action cannot be undone.')) {
      return
    }

    this.setState({loading: true})
    axios.delete(`/admin/web/flag/${flag.id}`).then(response => {
      // Reset the page if there are no flags left in this page
      if (this.state.flags.length === 1 && this.state.page > 1) {
        this.setState({page: this.state.page - 1}, () => {
          this.loadFlags()
        })
        return
      }
      this.loadFlags()
    }).catch(error => {
      this.setState({loading: false})
      alert('An error occurred while clearing the flag. Please refresh the page and try again.')
      console.error(error)
    })
  }

  next() {
    if (!this.state.has_more_pages) {
      return
    }

    this.setState({
      page: this.state.page + 1
    }, () => {
      this.loadFlags()
    })
  }

  back() {
    if (this.state.page <= 1) {
      return
    }

    this.setState({
      page: this.state.page - 1
    }, () => {
      this.loadFlags()
    })
  }

  renderTable() {
    if (this.state.total === 0) {
      return
    }

    return (
      <table className="table">
        <thead>
        <tr>
          <th>Thumbnail</th>
          <th style={{width: '300px'}}>Observation</th>
          <th>Reason</th>
          <th>Date Flagged</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {this.state.flags.map(flag => {
          const user        = flag.user
          const observation = flag.observation
          return (
            <tr key={flag.id}>
              <td className={'table-thumbnail-container'}>
                <img src={observation.thumbnail}
                     alt={observation.observation_category}
                     className={'table-thumbnail is-rounded'}/>
              </td>
              <td>
                <p>
                  <a href={`/observation/${observation.id}`}>
                    <strong>{observation.observation_category}</strong>
                  </a>
                </p>
                <p>
                  <strong>Uploaded by</strong> <Link to={`/user/${observation.user.id}`}>{observation.user.name}</Link>
                </p>
                <p>
                  <strong>Flagged by</strong> <Link to={`/user/${user.id}`}>{user.name}</Link>
                </p>
              </td>
              <td>
                <p>{flag.reason}</p>
                {flag.comments ? <div>
                  <p><strong>User Comments</strong></p>
                  <p>{flag.comments}</p>
                </div> : null}
              </td>
              <td>{flag.created_at}</td>
              <td>
                <Dropdown
                  right={true}
                  trigger={(
                    <button type={'button'}
                            className={'button'}>
                      <span>Actions</span>
                      <span className="icon is-small">
                        <i className="fa fa-caret-down"></i>
                      </span>
                    </button>
                  )}>
                  <a href={`/observation/${observation.id}`} className="dropdown-item">
                    <span className="icon is-small mr-0 text-info">
                      <i className="fa fa-eye"></i>
                    </span>
                    <span>Visit Observation</span>
                  </a>
                  <a
                     onClick={() => {
                       this.clearFlag(flag)
                     }}
                     className="dropdown-item">
                    <span className="icon is-small mr-0 text-danger">
                      <i className="fa fa-times"></i>
                    </span>
                    <span>Clear Flag</span>
                  </a>
                </Dropdown>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }

  renderPaginator() {
    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <button type={'button'}
                className="pagination-previous"
                disabled={this.state.page <= 1 || this.state.loading}
                onClick={() => this.back()}>
          Previous
        </button>
        <button type={'button'}
                className="pagination-next"
                disabled={!this.state.has_more_pages || this.state.loading}
                onClick={() => this.next()}>
          Next
        </button>
      </nav>
    )
  }

  render() {
    return (
      <div>
        <div className="columns is-marginless">
          <div className="column">
            <h1 className="title is-3">Flagged Observations</h1>
          </div>
          <div className="column has-text-right">
            {this.state.total} flags found. Page {this.state.page} of {Math.ceil(this.state.total / this.state.per_page)}
          </div>
        </div>
        <div className="box">
          {this.state.total === 0 && !this.state.loading ? <p>There are no flagged observations.</p> : null}
          {this.renderTable()}
          {this.renderPaginator()}
        </div>
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}
