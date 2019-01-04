import React, { Component } from 'react'
import Spinner from '../../components/Spinner'
import ObservationCard from '../../components/ObservationCard'
import Path from '../../helpers/Path'
import EmailModal from '../components/EmailModal'
import AdvancedFiltersModal from '../../components/AdvancedFiltersModal'
import Notify from '../../components/Notify'
import FiltersHelpModal from '../components/FiltersHelpModal'
import Scene from '../../scenes/Scene'

export default class ObservationsScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      loading             : true,
      observations        : [],
      total               : 0,
      page                : 0,
      perPage             : 6,
      pages               : [],
      collections         : [],
      ownedCollections    : [],
      showEmail           : false,
      showFiltersModal    : false,
      contact             : {
        to         : {
          user_id: 0,
          email  : ''
        },
        from       : '',
        observation: {}
      },
      user                : {},
      categories          : [],
      search              : '',
      selectedCollection  : -1,
      selectedCategory    : '',
      searchTermCategory  : 'all',
      advancedFilters     : [],
      selectedFilter      : -1,
      showHelpModal       : false,
      hasMorePages        : false,
      advancedFiltersRules: null
    }

    this.history = this.props.history

    document.title = 'Observations (Admin) - TreeSnap'
  }

  /**
   * Get observations from server.
   */
  componentWillMount() {
    this.setState({loading: true})

    this.setState(this.preLoadPage(), () => {
      this.loadObservations()
      this.loadCollections()
      this.loadUser()
      this.loadCategories()
      this.loadFilters()
    })

    this.history = this.props.history
  }

  async loadObservations(state) {
    try {
      const params   = this.getParams(state || this.state)
      const response = await axios.get('/admin/web/observations', {params})
      const data     = response.data.data
      this.setState({
        observations      : data.data,
        perPage           : data.per_page,
        selectedCollection: data.collection_id || -1,
        selectedFilter    : data.filter_id || -1,
        page              : data.page,
        hasMorePages      : data.has_more_pages,
        pages             : this.generatePages(data.total, data.per_page, data.page)
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({loading: false})
  }

  getParams(state) {
    return {
      per_page        : state.perPage,
      page            : state.page,
      advanced_filter : this.getSelectedID(state.selectedFilter),
      advanced_filters: state.advancedFiltersRules ? JSON.stringify(state.advancedFilters) : null,
      collection_id   : this.getSelectedID(state.selectedCollection),
      category        : state.selectedCategory || null
    }
  }

  getSelectedID(id) {
    return id === -1 ? null : id
  }

  /**
   * Load available collections.
   */
  loadCollections() {
    axios.get('/web/collections/mapped').then(response => {
      this.setState({collections: response.data.data})
    }).catch(error => {
      console.log(error)
    })

    axios.get('/web/collections/customizable/mapped').then(response => {
      this.setState({ownedCollections: response.data.data})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Load user info.
   */
  loadUser() {
    axios.get('/web/user').then(response => {
      this.setState({user: response.data.data})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Load observation categories from server.
   */
  loadCategories() {
    axios.get('/web/observations/categories').then(response => {
      let categories = response.data.data.map(category => {
        return {
          label: category,
          value: category
        }
      })
      this.setState({categories})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Load saved filters form server.
   */
  loadFilters() {
    axios.get('/web/filters').then(response => {
      let advancedFilters = response.data.data.map(filter => {
        return {
          label: filter.name,
          value: filter.id
        }
      })

      this.setState({advancedFilters})
    }).catch(error => {
      console.log(error.response)
    })
  }

  /**
   * Load the page based on the URL.
   *
   * @returns {{page: number, perPage: number, pages: *}}
   */
  preLoadPage() {
    let params     = Path.parseUrl(this.history.location.search)
    let page       = 0
    let perPage    = this.state.perPage
    let collection = this.state.selectedCollection

    if (typeof params.view !== 'undefined') {
      params.view = parseInt(params.view)

      if (isNaN(params.view)) {
        params.view = 6
      }

      if (params.view > 100 || params.view < 6) {
        perPage = 6
      } else {
        perPage = params.view
      }
    }

    if (typeof params.page !== 'undefined') {
      page = parseInt(params.page)

      if (isNaN(page)) {
        page = 1
      }
    }

    if (typeof params.collection !== 'undefined') {
      collection = parseInt(params.collection)

      if (isNaN(collection)) {
        collection = -1
      }
    }

    this.history.replace(`/observations?page=${page}&view=${perPage}&collection=${collection}`)

    return {
      page,
      perPage,
      selectedCollection: collection
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
    if (typeof total === 'undefined') {
      total = this.state.total
    }

    if (typeof perPage === 'undefined') {
      perPage = this.state.perPage
    }

    if (typeof currentPage === 'undefined') {
      currentPage = this.state.page
    }

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

  /**
   * Navigate to next page.
   */
  nextPage() {
    // Don't flip forward if we reached the last page
    if (!this.state.hasMorePage) {
      return
    }

    let page = this.state.page + 1
    this.goToPage(page)
  }

  /**
   * Navigate to next page.
   */
  previousPage() {
    // Don't flip back if we are at the first page
    if (this.state.page === 0) {
      return
    }

    let page = this.state.page - 1
    this.goToPage(page)
  }

  /**
   * Navigate to a certain page.
   *
   * @param page
   */
  goToPage(page) {
    let collection = this.state.selectedCollection
    let state      = this.state
    state.page     = page

    this.loadObservations(state)

    this.history.push(`/observations?page=${page + 1}&view=${this.state.perPage}&collection=${collection}`)

    window.scroll(0, 0)
  }

  /**
   * Apply search filter.
   *
   * @param search
   */
  searchFilter(search) {
    this.setState({search}, this.loadObservations)
  }

  /**
   * Apply advanced filter by replacing observations.
   *
   * @param observations
   */
  replaceObservations(observations) {
    this.allObservations = observations
    this.paginate(this.filter.replace(observations), false)
  }

  /**
   * Load and apply advanced filter.
   *
   * @param id
   * @param observations
   */
  loadAdvancedFilter(id) {
    this.setState({
      selectedFilter: parseInt(id)
    }, this.loadObservations)
  }

  /**
   * Apply collection filter.
   *
   * @param selectedCollection
   */
  collectionFilter(selectedCollection) {
    this.setState({selectedCollection}, this.loadObservations)
    this.history.push(`/observations?page=1&view=${this.state.perPage}&collection=${selectedCollection}`)
  }

  /**
   * Apply category filter.
   *
   * @param selectedCategory
   */
  categoriesFilter(selectedCategory) {
    this.setState({selectedCategory}, this.loadObservations)
  }

  /**
   * Filter by search term.
   *
   * @param searchTermCategory
   */
  searchCategoryFilter(searchTermCategory) {
    this.setState({searchTermCategory}, this.loadObservations)
  }

  /**
   * Render filter bar.
   *
   * @returns {XML}
   */
  renderFilters() {
    return (
      <div className="columns is-multiline flex-v-center">
        <div className="column is-4">
          <p><b>Filters</b></p>
        </div>
        <div className="column is-8 has-text-right">
          <span className="mr-0">{this.state.total} Total Observations. Showing</span>
          <span className="select is-small">
            <select value={this.state.perPage}
                    onChange={({target}) => this.changePerPage(target.value)}>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
              <option value="96">96</option>
            </select>
          </span>
          <span className="ml-0">per page</span>
        </div>
        <div className="column is-4">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input type="search"
                     className="input"
                     placeholder="Search"
                     onChange={({target}) => this.searchFilter(target.value)}
                     value={this.state.search}
              />
            </div>
            <div className="control">
              <span className="select">
                <select
                  value={this.state.searchTermCategory}
                  onChange={({target}) => this.searchCategoryFilter(target.value)}
                >
                  <option value="all">Any</option>
                  <option value="user">User Name</option>
                  <option value="category">Title</option>
                  <option value="address">Full Address</option>
                  <option value="state">State</option>
                  <option value="county">County</option>
                  <option value="city">City</option>
                  <option value="id">Unique ID</option>
                  <option value="custom">Custom ID</option>
                </select>
              </span>
            </div>
          </div>
        </div>
        {this.state.collections.length > 0 ?
          <div className="column is-4">
            <div className="field">
              <div className="control">
                <span className="select is-full-width">
                  <select
                    value={this.state.selectedCollection}
                    onChange={({target}) => this.collectionFilter(target.value)}>
                    <option value="-1">All Collections</option>
                    {this.state.collections.map(collection => {
                      return (
                        <option key={collection.value}
                                value={collection.value}>
                          {collection.label}
                        </option>
                      )
                    })}
                  </select>
                </span>
              </div>
            </div>
          </div>
          : null}
        <div className="column is-4">
          <div className="field">
            <div className="control">
              <span className="select is-full-width">
                <select value={this.state.selectedCategory}
                        onChange={({target}) => this.categoriesFilter(target.value)}>
                  <option value="">All Species</option>
                  {this.state.categories.map(category => {
                    return (
                      <option key={category.value}
                              value={category.value}>
                        {category.label}
                      </option>
                    )
                  })}
                </select>
              </span>
            </div>
          </div>
        </div>
        {this.state.advancedFilters.length > 0 ?
          <div className="column is-4">
            <div className="field">
              <div className="control">
                <span className="select is-full-width">
                  <select value={this.state.selectedFilter}
                          onChange={({target}) => this.loadAdvancedFilter(target.value)}>
                    <option value="-1">Select Advanced Filter</option>
                    {this.state.advancedFilters.map(filter => {
                      return (
                        <option value={filter.value}
                                key={filter.value}>
                          {filter.label}
                        </option>
                      )
                    })}
                  </select>
                </span>
              </div>
            </div>
          </div>
          : null}
        <div className="column is-4">
          <div className="field">
            <div className="control">
              <a onClick={() => this.setState({showFiltersModal: true})}>Advanced Filters</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Change the number of cards per page.
   *
   * @param perPage
   */
  changePerPage(perPage) {
    let state      = this.state
    let collection = this.state.selectedCollection
    state.perPage  = perPage
    state.page     = 1
    this.loadObservations(state)

    this.history.replace(`/observations?page=1&view=${perPage}&collection=${collection}`)
  }

  /**
   * Render.
   *
   * @returns {XML}
   */
  render() {
    let isLastPage  = this.state.hasMorePages
    let isFirstPage = this.state.page === 0

    return (
      <div>
        <Spinner visible={this.state.loading}/>

        <EmailModal visible={this.state.showEmail}
                    contact={this.state.contact}
                    observation={this.state.contact.observation}
                    onCloseRequest={() => this.setState({showEmail: false})}/>

        <FiltersHelpModal
          visible={this.state.showHelpModal}
          onCloseRequest={() => this.setState({showHelpModal: false})}
        />

        <AdvancedFiltersModal
          visible={this.state.showFiltersModal}
          onCloseRequest={() => this.setState({showFiltersModal: false})}
          onCreate={response => {
            this.setState({
              showAdvancedFiltersModal: false
            })

            let data = response.data
            if (data.filter) {
              let filters = this.state.filters
              filters.push(data.filter)
              this.setState({
                filters
              })

              this.advancedFilter(data.filter.id)
              return
            }

            let state = this.state

            state.advancedFiltersRules = response.params
            state.page                 = 1
            this.setState({page: 1, advancedFiltersRules: state.advancedFiltersRules})

            this.loadObservations(state)
          }}/>

        <div className="columns flex-v-center">
          <div className="column is-6">
            <h1 className="title is-3"> Observations</h1>
          </div>
          <div className="column is-6 has-text-right">
            {/*<button type="button"*/}
            {/*className="button is-info"*/}
            {/*onClick={() => this.setState({showHelpModal: true})}>*/}
            {/*<span className="icon">*/}
            {/*<i className="fa fa-question-circle-o"></i>*/}
            {/*</span>*/}
            {/*<span style={{marginTop: -2}}>Help</span>*/}
            {/*</button>*/}
          </div>
        </div>

        {this.renderFilters()}

        {this.state.observations.length === 0 ? <p className="mb-0">No results found</p> : null}

        <div className="columns is-multiline">
          {this.state.observations.map(observation => {
            return (
              <div key={observation.observation_id}
                   className="column is-4-widescreen is-6-desktop is-6-tablet">
                <ObservationCard
                  observation={observation}
                  collections={this.state.ownedCollections}
                  onEmailRequest={(observation) => {
                    this.setState({
                      showEmail: true,
                      contact  : {
                        to  : {
                          user_id: observation.user.id,
                          name   : observation.user.name
                        },
                        from: this.state.user.email,
                        observation
                      }
                    })
                  }}
                  onFlagChange={(event, data) => {
                    if (event === 'removed') {
                      let flags = []
                      observation.flags.map(flag => {
                        if (flag.id !== parseInt(data.id)) {
                          flags.push(flag)
                        }
                      })
                      observation.flags = flags
                      return
                    }
                    observation.flags.push(data)
                  }}
                  onCollectionCreated={(data) => {
                    let ownedCollections = this.state.ownedCollections
                    let found            = false
                    ownedCollections.map(collection => {
                      if (collection.value === data.id) {
                        found = true
                      }
                    })

                    if (!found) {
                      ownedCollections.push({
                        label: data.label,
                        value: data.id
                      })
                    }

                    observation.collections.push({
                      id         : data.id,
                      label      : data.label,
                      description: data.description
                    })
                    this.setState({ownedCollections})
                    this.forceUpdate()
                    Notify.push(`Added "${observation.observation_category}" to "${data.label}" successfully`)
                  }}
                  onRemovedFromCollection={(collection) => {
                    observation.collections = observation.collections.filter(c => c.id !== collection.id)
                    this.forceUpdate()
                    Notify.push(`Removed "${observation.observation_category}" from "${collection.label}" successfully`)
                  }}
                />
              </div>
            )
          })}
        </div>

        <div style={{display: this.state.total > this.state.perPage ? 'block' : 'none'}}>
          <nav className="pagination is-centered">
            <a className="pagination-previous"
               disabled={isFirstPage}
               onClick={this.previousPage.bind(this)}>
              Previous
            </a>
            <a className="pagination-next" disabled={isLastPage} onClick={this.nextPage.bind(this)}>
              Next page
            </a>
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
                    <a className={`pagination-link${this.state.page === page - 1 ? ' is-current' : ''}`}
                       onClick={() => {
                         if (this.state.page !== page - 1) {
                           this.goToPage.call(this, page - 1)
                         }
                       }}>
                      {page}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
