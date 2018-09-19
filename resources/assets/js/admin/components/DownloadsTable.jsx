import React, { Component } from 'react'
import Spinner from '../../components/Spinner'

export default class DownloadsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading       : false,
      page          : 1,
      total         : 0,
      has_more_pages: false,
      per_page      : 6,
      downloads     : [],
      pages         : []
    }
  }

  componentDidMount() {
    this.loadDownloadsData(1)
  }

  generatePages(total, per_page) {
    let pages = []
    let max   = Math.ceil(total / per_page)

    for (let i = 1; i <= max; i++) {
      pages.push(i)
    }

    this.setState({pages})
  }

  async loadDownloadsData(page, per_page) {
    this.setState({loading: true})

    if (!page) {
      page = 1
    }

    if (!per_page) {
      per_page = 6
    }

    try {
      const response = await axios.get('/admin/web/analytics/downloads', {
        params: {
          page, per_page
        }
      })
      const data     = response.data.data
      console.log(data)
      this.setState({
        downloads     : data.data,
        total         : data.total,
        page          : data.current_page,
        has_more_pages: data.next_page_url !== null,
        per_page      : data.per_page
      })
      this.generatePages(data.total, data.per_page)
    } catch (e) {
      console.error(e)
    }

    this.setState({loading: false})
  }

  prev() {
    if (this.state.page <= 1) {
      return
    }

    this.loadDownloadsData(this.state.page - 1)
  }

  next() {
    if (!this.state.has_more_pages) {
      return
    }

    this.loadDownloadsData(this.state.page + 1)
  }

  goTo(page) {
    this.loadDownloadsData(page)
  }

  renderPagination() {
    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <button className={`pagination-previous${this.state.loading ? ' is-loading' : ''}`}
                onClick={this.prev.bind(this)}
                disabled={this.state.page <= 1}>
          Previous
        </button>
        <button className={`pagination-next${this.state.loading ? ' is-loading' : ''}`}
                onClick={this.next.bind(this)}
                disabled={!this.state.has_more_pages}>
          Next
        </button>
        <div className="pagination-list">
          <span className={`select${this.state.loading ? ' is-loading' : ''}`}>
            <select title={'page'}
                    disabled={this.state.pages.length === 1}
                    value={this.state.page}
                    onChange={({target}) => {
                      this.goTo(target.value)
                    }}>
              {this.state.pages.map(page => {
                return (<option value={page} key={page}>{page}</option>)
              })}
            </select>
          </span>
        </div>
      </nav>
    )
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <Spinner visible={this.state.loading} containerStyle={{position: 'absolute'}}/>
        <table className={'table table-fixed'}>
          <thead>
          <tr>
            <th>User Name</th>
            <th>Observations in File</th>
            <th className={'has-text-right'}>Date Downloaded</th>
          </tr>
          </thead>
          <tbody>
          {this.state.downloads.map(data => {
            return (
              <tr key={data.id}>
                <td>{data.user.name}</td>
                <td>{data.observations_count}</td>
                <td className={'has-text-right'}>{data.created_at}</td>
              </tr>
            )
          })}
          </tbody>
        </table>

        {this.renderPagination()}
      </div>
    )
  }
}
