import React, { Component } from 'react'
import Spinner from '../../components/Spinner'
import ObservationCard from '../../components/ObservationCard'
import Path from '../../helpers/Path'
import EmailModal from '../components/EmailModal'
import AdvancedFiltersModal from '../../components/AdvancedFiltersModal'
import Notify from '../../components/Notify'
import FiltersHelpModal from '../components/FiltersHelpModal'
import Scene from '../../scenes/Scene'
import Dropdown from '../../components/Dropdown'

export default class ObservationsScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      loading             : true,
      observations        : [],
      total               : 0,
      page                : 1,
      perPage             : 6,
      pages               : [],
      collections         : [],
      ownedCollections    : [],
      showEmail           : false,
      showFiltersModal    : false,
      downloadParams      : '',
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
      selectedStatus      : 0,
      showHelpModal       : false,
      hasMorePages        : false,
      advancedFiltersRules: null,
      reduceCardOpacity   : false
    }

    this.history               = this.props.history
    this._advancedFiltersState = {}

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
        page              : data.current_page,
        total             : data.total,
        hasMorePages      : data.has_more_pages,
        pages             : this.generatePages(data.total, data.per_page, data.page)
      }, this.makeDownloadLink)
    } catch (error) {
      console.error(error)
    }

    this.setState({loading: false, reduceCardOpacity: false})
  }

  getParams(state) {
    return {
      search          : state.search || null,
      per_page        : state.perPage,
      page            : state.page,
      advanced_filter : this.getSelectedID(state.selectedFilter),
      advanced_filters: state.advancedFiltersRules ? JSON.stringify(state.advancedFiltersRules) : null,
      collection_id   : this.getSelectedID(state.selectedCollection),
      category        : state.selectedCategory || null,
      status          : state.selectedStatus === 0 || state.selectedStatus === '0' ? null : state.selectedStatus,
      view_type : 'full'
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
          rules: filter.rules,
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
   * Creates the download params string from the current state.
   */
  makeDownloadLink() {
    const {
            selectedCollection,
            search,
            advancedFiltersRules,
            selectedFilter,
            selectedCategory,
            selectedStatus
          } = this.state

    const params = {
      collection_id   : selectedCollection,
      search          : search,
      advanced_filters: advancedFiltersRules ? JSON.stringify(advancedFiltersRules) : null,
      category        : selectedCategory,
      advanced_filter : this.getSelectedID(selectedFilter),
      view_type : 'full',
      status          : selectedStatus === 0 || selectedStatus === '0' ? null : selectedStatus
    }

    let downloadParams = this.makeUrlQueryFromObject(params)

    this.setState({downloadParams})
  }

  makeUrlQueryFromObject(object) {
    let link = Object.keys(object).filter(key => {
      return object[key] && object[key].length > 0
    }).map(key => {
      return `${key}=${object[key]}`
    })

    return link.join('&')
  }

  /**
   * Load the page based on the URL.
   *
   * @returns {{page: number, perPage: number, pages: *}}
   */
  preLoadPage() {
    let params     = Path.parseUrl(this.history.location.search)
    let page       = 1
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
    let state      = this.state
    let perPage    = state.perPage
    let collection = state.selectedCollection
    state.page     = page

    this.setState({
      page,
      reduceCardOpacity: true
    }, this.loadObservations)

    this.history.push(`/observations?page=${page}&view=${perPage}&collection=${collection}`)

    window.scroll(0, 0)
  }

  /**
   * Apply search filter.
   *
   * @param search
   */
  searchFilter(search) {
    this.setState({search, reduceCardOpacity: true}, this.loadObservations)
  }

  /**
   * Load and apply advanced filter.
   *
   * @param id
   */
  loadAdvancedFilter(id) {
    id = parseInt(id)
    this.setState({
      selectedFilter   : id,
      reduceCardOpacity: true
    }, this.loadObservations)
  }

  /**
   * Apply collection filter.
   *
   * @param selectedCollection
   */
  collectionFilter(selectedCollection) {
    this.setState({
      selectedCollection: parseInt(selectedCollection),
      reduceCardOpacity : true
    }, this.loadObservations)

    const url = `/observations?page=1&view=${this.state.perPage}&collection=${selectedCollection}`
    this.history.push(url)
  }

  /**
   * Apply category filter.
   *
   * @param selectedCategory
   */
  categoriesFilter(selectedCategory) {
    const reduceCardOpacity = true
    this.setState({
      selectedCategory,
      reduceCardOpacity
    }, this.loadObservations)
  }

  /**
   * Filter by search term.
   *
   * @param searchTermCategory
   */
  searchCategoryFilter(searchTermCategory) {
    const reduceCardOpacity = true
    this.setState({
      searchTermCategory,
      reduceCardOpacity
    }, this.loadObservations)
  }

  /**
   * Change the marked as status.
   *
   * @param status
   */
  changeStatus(status) {
    this.setState({
      selectedStatus   : status,
      reduceCardOpacity: true
    }, this.loadObservations)
  }

  /**
   * Render filter bar.
   *
   * @returns {XML}
   */
  renderFilters() {
    let {advancedFiltersRules} = this.state
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
                     placeholder="Search (by ID, name, address, etc)"
                     onChange={({target}) => this.searchFilter(target.value)}
                     value={this.state.search}
              />
            </div>
            {/*<div className="control">*/}
            {/*<span className="select">*/}
            {/*<select*/}
            {/*value={this.state.searchTermCategory}*/}
            {/*onChange={({target}) => this.searchCategoryFilter(target.value)}*/}
            {/*>*/}
            {/*<option value="all">Any</option>*/}
            {/*<option value="user">User Name</option>*/}
            {/*<option value="category">Title</option>*/}
            {/*<option value="address">Full Address</option>*/}
            {/*<option value="state">State</option>*/}
            {/*<option value="county">County</option>*/}
            {/*<option value="city">City</option>*/}
            {/*<option value="id">Unique ID</option>*/}
            {/*<option value="custom">Custom ID</option>*/}
            {/*</select>*/}
            {/*</span>*/}
            {/*</div>*/}
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

        <div className="column is-4">
          <div className="field">
            <div className="control">
              <span className="select is-full-width">
                <select
                  value={this.state.selectedStatus}
                  onChange={({target}) => this.changeStatus(target.value)}
                >
                  <option value={0}>Any Status</option>
                  <option value={'marked_correct_by_anyone'}>Species marked correct by anyone</option>
                  <option value={'marked_correct_by_me'}>Species marked correct by me</option>
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
              <button
                onClick={() => {
                  this.setState({showFiltersModal: true})
                  if (this.advancedFiltersModal) {
                    this.advancedFiltersModal.reapplyState(this._advancedFiltersState)
                  }
                }}
                className={`button is-primary`}
                type={'button'}>Advanced Filters
              </button>
              {advancedFiltersRules && Object.keys(advancedFiltersRules).length > 0 ?
                <button
                  onClick={() => {
                    this.setState({
                      advancedFiltersRules: null,
                      reduceCardOpacity   : false
                    }, this.loadObservations)
                    this._advancedFiltersState = {}
                  }}
                  className={`ml-1 button is-danger is-outlined`}
                  type={'button'}>
                  <span className="icon is-small">
                    <i className="fa fa-times-circle"></i>
                  </span>
                  <span>Clear Filters</span>
                </button>
                : null}

              <Dropdown right={true}
                        isBlock={false}
                        trigger={(
                          <button className="button ml-1" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span className="icon is-small">
                              <i className="fa fa-download"></i>
                            </span>
                            <span>Download</span>
                            <span className="icon is-small">
                              <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                          </button>
                        )}>
                <a href={`/services/download/observations/tsv?${this.state.downloadParams}`}
                   target={'_blank'}
                   className="dropdown-item">
                  TSV Format
                </a>
                <a href={`/services/download/observations/csv?${this.state.downloadParams}`}
                   target={'_blank'}
                   className="dropdown-item">
                  CSV Format
                </a>
              </Dropdown>
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

    this.setState({
      page: 1,
      perPage
    }, this.loadObservations)

    this.history.replace(`/observations?page=1&view=${perPage}&collection=${collection}`)
  }

  advancedFilter(filter_id) {
    this.setState({
      advanced_filter: filter_id,
      page           : 1
    }, this.loadObservations)
  }

  /**
   * Save the current state to make sure it gets reapplied later.
   * @param state
   */
  saveFilterState(state) {
    this._advancedFiltersState = state
  }

  /**
   * Render.
   *
   * @returns {XML}
   */
  render() {
    let isLastPage  = !this.state.hasMorePages
    let isFirstPage = parseInt(this.state.page) <= 1

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
          ref={ref => this.advancedFiltersModal = ref}
          visible={this.state.showFiltersModal}
          onCloseRequest={() => this.setState({showFiltersModal: false})}
          onCreate={response => {
            this.setState({
              showFiltersModal: false
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

            this.setState({
              page                : 1,
              advancedFiltersRules: response.params,
              showFiltersModal    : false
            }, this.loadObservations)
          }}
          onStateChange={this.saveFilterState.bind(this)}
        />

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
                  loading={this.state.reduceCardOpacity}
                  observation={observation}
                  collections={this.state.ownedCollections}
                  showMarks={true}
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
            <a className="pagination-next"
               disabled={isLastPage}
               onClick={this.nextPage.bind(this)}>
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
        </div>
      </div>
    )
  }
}
