import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Scene from '../../scenes/Scene'

export default class UsersScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      users        : [],
      search       : '',
      page         : 1,
      last_page    : false,
      total        : 0,
      loading      : true,
      showingFrom  : 0,
      showingTo    : 0,
      sortBy       : 'users.name',
      sortDirection: 'asc',
      pages        : [],
      loadingUsers : true
    }

    document.title = 'Users - TreeSnap'
  }

  componentDidMount() {
    this.loadUsers()
  }

  getParams() {
    const state = this.state

    return {
      page    : state.page,
      search  : state.search,
      sort_by : state.sortBy,
      sort_dir: state.sortDirection
    }
  }

  /**
   * Generate page numbers.
   *
   * @param total
   * @param perPage
   * @param currentPage
   *
   * @returns {Array}
   */
  generatePages(total, perPage, currentPage) {
    let pages    = []
    let numPages = Math.ceil(total / perPage)
    let pageSet  = Math.min(numPages, 7)
    let start    = 1

    if (numPages > 7 && currentPage > 3) {
      pages.push(1)
      pages.push('...')
      start = currentPage - 3
      if (start === 1) {
        start++
      }
    }

    for (let i = start; i < Math.min(pageSet + start, numPages + 1); i++) {
      pages.push(i)
    }

    if (numPages > 7 && currentPage + 3 < numPages) {
      pages.push('...')
      pages.push(numPages)
    }

    return pages
  }

  nextPage() {
    if (this.state.last_page) {
      return
    }

    this.goToPage(this.state.page + 1)
  }

  prevPage() {
    if (this.state.page === 1) {
      return
    }

    this.goToPage(this.state.page - 1)
  }

  goToPage(page) {
    this.setState({page, loadingUsers: true}, this.loadUsers)
  }

  async loadUsers() {
    try {
      let response = await axios.get('/admin/web/users', {params: this.getParams()})
      const data   = response.data.data
      this.setState({
        users      : data.data,
        page       : data.current_page,
        showingFrom: data.from,
        showingTo  : data.to,
        last_page  : data.last_page === data.page,
        total      : data.total,
        pages      : this.generatePages(data.total, data.per_page, data.current_page)
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({loading: false, loadingUsers: false})
  }

  _renderRow(user, index) {
    return (
      <tr key={index}>
        <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
        <td>{user.email}</td>
        <td>{user.observations_count}</td>
        <td>{user.role ? user.role.name : 'here'}</td>
      </tr>
    )
  }

  search(search) {
    this.setState({search}, this.loadUsers)
  }

  renderSortIcon(field) {
    if (this.state.sortBy === field) {
      if (this.state.sortDirection === 'desc') {
        return (<i className={'fa fa-sort-desc'}></i>)
      }

      return (<i className={'fa fa-sort-asc'}></i>)
    }

    return (
      <i className={'fa fa-sort'}></i>
    )
  }

  sort(field) {
    this.setState({loadingUsers: true})
    if (field === this.state.sortBy) {
      if (this.state.sortDirection === 'asc') {
        return this.setState({sortDirection: 'desc'}, this.loadUsers)
      }
      return this.setState({sortDirection: 'asc'}, this.loadUsers)
    }

    return this.setState({sortDirection: 'asc', sortBy: field}, this.loadUsers)
  }

  renderTable() {
    if (this.state.users.length === 0 && !this.state.loading) {
      return (
        <p>
          0 Users found
        </p>
      )
    }

    return (
      <table
        className={`table is-striped mb-none${this.state.loadingUsers ? ' opacity-05' : ''}`}
        id="users-table">
        <thead>
        <tr>
          <th>
            <a
              onClick={() => this.sort('users.name')}
              className={'sortable-th flex-space-between is-flex'}>
              Name {this.renderSortIcon('users.name')}
            </a>
          </th>
          <th>
            <a
              onClick={() => this.sort('users.email')}
              className={'sortable-th flex-space-between is-flex'}>
              Email {this.renderSortIcon('users.email')}
            </a>
          </th>
          <th>
              Observations
          </th>
          <th>
              Role
          </th>
        </tr>
        </thead>
        <tbody>
        {this.state.users.map(this._renderRow.bind(this))}
        </tbody>
      </table>
    )
  }

  renderPagination() {
    let isFirstPage = this.state.page === 1,
        isLastPage  = this.state.last_page

    return (
      <nav className="pagination is-centered mt-1">
        <button
          type={'button'}
          className="pagination-previous"
          disabled={isFirstPage}
          onClick={this.prevPage.bind(this)}>
          Previous
        </button>
        <button
          type={'button'}
          className="pagination-next"
          disabled={isLastPage}
          onClick={this.nextPage.bind(this)}>
          Next page
        </button>
        <ul className="pagination-list">
          {this.state.pages.map((page, index) => {
            if (page === '...') {
              return (
                <li key={`hellip_${index}`}>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
              )
            }
            return (
              <li key={`page_${page}`}>
                <a className={`pagination-link${this.state.page === page ? ' is-current' : ''}`}
                   onClick={() => {
                     if (this.state.page !== page) {
                       this.goToPage.call(this, page)
                     }
                   }}>
                  {page}
                </a>
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
        <div className="columns">
          <div className="column">
            <h1 className="title is-3">Users</h1>
          </div>
          <div className="column is-narrow has-text-right">
            <a href={'/admin/users/download'} className={'button'}>
              <span className="icon is-small">
                <i className="fa fa-download"></i>
              </span>
              <span>Download</span>
            </a>
          </div>
        </div>
        <div className="box">
          <div className="columns">
            <div className="column">
              <div className="field">
                <div className="control">
                  <input type="text"
                         className="input"
                         name="search"
                         placeholder="Search"
                         value={this.state.search}
                         onChange={({target}) => this.search(target.value)}/>
                </div>
              </div>
            </div>
            <div className="column has-text-right">
              {this.state.total} Total Users. Showing {this.state.showingFrom} to {this.state.showingTo}
            </div>
          </div>
          {this.renderTable()}
          {this.renderPagination()}
        </div>
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}
