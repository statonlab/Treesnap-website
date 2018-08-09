import React, { Component } from 'react'
import ObservationCard from '../components/ObservationCard'
import Spinner from '../components/Spinner'
import Path from '../helpers/Path'
import AccountView from '../components/AccountView'
import AdvancedFiltersModal from '../components/AdvancedFiltersModal'
import Dropdown from '../components/Dropdown'
import Scene from './Scene'

export default class MyObservationsScene extends Scene {
  constructor(props) {
    super(props)
    this.state = {
      observations            : [],
      collections             : [],
      filters                 : [],
      groups                  : [],
      selectedGroup           : 0,
      selectedCollection      : 0,
      selectedFilter          : 0,
      page                    : 1,
      lastPage                : 59,
      nextPageUrl             : '',
      prevPageUrl             : '',
      perPage                 : 6,
      total                   : 0,
      pageLoading             : true,
      pages                   : [],
      loading                 : false,
      count                   : 0,
      search                  : '',
      categories              : [],
      selectedCategory        : '',
      hasMorePages            : false,
      ownedCollections        : [],
      disableCollections      : false,
      disableGroups           : false,
      showAdvancedFiltersModal: false,
      advancedFiltersRules    : {}
    }

    this._advancedFilterState = null

    document.title = 'Observations - TreeSnap'
  }

  /**
   * Get the user record from the server.
   */
  componentDidMount() {
    let pageState            = this.getBrowserState()
    let state                = this.state
    state.page               = pageState.page
    state.selectedCollection = pageState.collection
    state.selectedGroup      = pageState.group
    state.disableCollections = pageState.disableCollections
    state.disableGroups      = pageState.disableGroups
    this.loadObservations(state)
    this.loadCollections()
    this.loadCategories()
    this.loadGroups()
    this.loadFilters()
    window.fixHeight()
  }

  /**
   * Get observations from server.
   *
   * @param state
   */
  loadObservations(state) {
    this.setState({loading: true})

    let params = this.getParams(state)

    axios.get('/web/user/observations', {params}).then(response => {
      const data = response.data.data
      let state  = {
        observations: data.data,
        page        : data.current_page,
        nextPageUrl : data.next_page_url,
        prevPageUrl : data.prev_page_url,
        total       : data.total,
        perPage     : data.per_page,
        hasMorePages: data.has_more_pages,
        count       : data.count,
        pageLoading : false,
        pages       : this.generatePages(data.total, data.per_page),
        loading     : false
      }

      if (data.collection_id) {
        state.selectedCollection = data.collection_id
      }

      if (data.group_id) {
        state.selectedGroup = data.group_id
      }

      this.setState(state)
      this.setBrowserHistory(state)
    }).catch(error => {
      this.setState({pageLoading: false, loading: false})
      console.log(error)
      let response = error.response
      if (response && response.status === 500) {
        alert('Network Error. Please contact us to resolve this issue.')
      }
    })
  }

  /**
   * Generate params
   * @param state
   * @param withoutPageInfo
   * @return {{page: *, per_page: (number|*), search: (*|string), category: (*|string), group_id: number | string, collection_id: number | string, advanced_filters: *}}
   */
  getParams(state, withoutPageInfo) {
    let advancedFilters = null
    let filterID        = parseInt(state.selectedFilter)

    if (filterID !== 0) {
      let advancedFiltersArray = state.filters.filter(filter => filter.id === filterID)
      if (advancedFiltersArray[0]) {
        advancedFilters = advancedFiltersArray[0].rules
      }
    } else if (state.advancedFiltersRules) {
      advancedFilters = Object.keys(state.advancedFiltersRules).length > 0 ? state.advancedFiltersRules : null
    }

    let params = {
      page            : state.page,
      per_page        : state.perPage,
      search          : state.search || '',
      category        : state.selectedCategory || '',
      group_id        : parseInt(state.selectedGroup) || '',
      collection_id   : parseInt(state.selectedCollection) || '',
      advanced_filters: advancedFilters
    }

    if (withoutPageInfo) {
      delete params.page
      delete params.per_page
    }

    return params
  }

  /**
   * Load all collections.
   */
  loadCollections() {
    axios.get('/web/collections/1').then(response => {
      const collections = response.data.data
      this.setState({collections})
    }).catch(error => {
      console.log(error)
    })

    axios.get('/web/collections/customizable/1').then(response => {
      this.setState({ownedCollections: response.data.data})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Get available categories.
   */
  loadCategories() {
    axios.get('/web/observations/categories').then(response => {
      let data = response.data.data
      this.setState({
        categories: data.map(category => {
          return {label: category, value: category}
        })
      })
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Get groups the user belongs to.
   */
  loadGroups() {
    axios.get('/web/groups').then(response => {
      this.setState({
        groups: response.data.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Get filters the belong to this user.
   */
  loadFilters() {
    axios.get('/web/filters').then(response => {
      this.setState({filters: response.data.data})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Generate pages array.
   *
   * @param total
   * @param perPage
   * @returns {Array}
   */
  generatePages(total, perPage) {
    let pages = []
    let max   = Math.ceil(total / perPage)
    for (let i = 1; i <= max; i++) {
      pages.push(i)
    }

    return pages
  }

  /**
   * Set browser history based on current state.
   * @param state
   */
  setBrowserHistory(state) {
    let query = []

    if (state.page) {
      query.push(`page=${state.page}`)
    }

    if (state.selectedCollection) {
      query.push(`collection=${state.selectedCollection}`)
    }

    if (state.selectedGroup && !state.selectedCollection) {
      query.push(`group=${state.selectedGroup}`)
    }

    const params = query.join('&')

    this.props.history.replace(`/account/observations/?${params}`)
  }

  /**
   * Get page number from the browser url.
   * @returns {*}
   */
  getBrowserState() {
    let params = Path.parseUrl(this.props.history.location.search)

    let page               = 1
    let collection         = 0
    let group              = 0
    let disableGroups      = false
    let disableCollections = false

    if (typeof params.page !== 'undefined') {
      let p = parseInt(params.page)
      if (!isNaN(p)) {
        page = p
      }
    }

    if (typeof params.collection !== 'undefined') {
      let c = parseInt(params.collection)
      if (!isNaN(c)) {
        collection    = c
        disableGroups = true
      }
    }

    if (typeof params.group !== 'undefined' && !collection) {
      let g = parseInt(params.group)
      if (!isNaN(g)) {
        group              = g
        disableCollections = true
      }
    }

    return {
      page,
      collection,
      group,
      disableGroups,
      disableCollections
    }
  }

  /**
   * Go to the next page.
   */
  nextPage() {
    if (!this.state.hasMorePages) {
      return
    }

    let page = this.state.page + 1
    this.goToPage(page)
  }

  /**
   * Go to the previous page.
   */
  prevPage() {
    if (this.state.page === 1) {
      return
    }

    let page = this.state.page - 1
    this.goToPage(page)
  }

  /**
   * Go to a specific page number.
   *
   * @param page
   */
  goToPage(page) {
    let state  = this.state
    state.page = page
    this.loadObservations(state)
    this.setBrowserHistory(state)

    if (window.scrollTo) {
      window.scrollTo(0, 0)
    }
  }

  /**
   * Render page links.
   *
   * @returns {XML}
   * @private
   */
  _renderPageLinks() {
    return (
      <nav className="pagination is-centered">
        <a href="javascript:;"
           className="pagination-previous"
           onClick={this.prevPage.bind(this)}
           disabled={this.state.page === 1}>
          Previous
        </a>
        {this.state.pages.length > 0 ?
          <ul className="pagination-list">
            <li>
              Page <span className="select is-small">
              <select value={this.state.page} onChange={({target}) => this.goToPage(target.value)}>
                {this.state.pages.map(page => {
                  return <option value={page} key={`page_${page}`}>{page}</option>
                })}
              </select>
            </span> out of {this.state.pages.length} pages
            </li>
          </ul>
          : null}
        <a href="javascript:;"
           className="pagination-next"
           onClick={this.nextPage.bind(this)}
           disabled={!this.state.hasMorePages}>
          Next
        </a>
      </nav>
    )
  }

  /**
   * Render the observation card.
   *
   * @param observation
   * @returns {XML}
   * @private
   */
  _renderObservation(observation) {
    return (
      <div className="column is-4-widescreen is-6-desktop is-6-tablet" key={observation.observation_id}>
        <ObservationCard
          owner={true}
          observation={observation}
          loading={this.state.loading}
          collections={this.state.ownedCollections}
          onCollectionCreated={collection => {
            let exists = !observation.collections.every(c => c.id !== collection.id)
            let owned  = !this.state.ownedCollections.every(c => c.value !== collection.id)

            if (!owned) {
              this.setState({
                ownedCollections: this.state.ownedCollections.concat({
                  label: collection.label,
                  value: collection.id
                })
              })
            }

            if (exists) {
              return
            }

            observation.collections.push(collection)
            this.forceUpdate()
          }}
          onRemovedFromCollection={(collection) => {
            observation.collections = observation.collections.filter(c => c.id !== collection.id)
            this.forceUpdate()
          }}
        />
      </div>
    )
  }

  /**
   * Generate a message for 0 observations.
   * @returns {XML}
   */
  getEmptyMessage() {
    return (
      <div className="box">
        <div className="content">
          <p>You have not submitted any observations matching the specified filters yet.</p>
          <p>
            {
              /* Unfortunately the links have to be structured this way or otherwise the spacing
              ** will be wrong and words wouldn't get separated by a space
              **/
            }
            To submit new observations, please download the TreeSnap mobile app
            from <a href="https://play.google.com/store/apps/details?id=com.treesource">
            Google Play for Android
          </a> or <a href="https://itunes.apple.com/us/app/treesnap/id1226499160?mt=8">
            Apple App Store for iOS</a>
          </p>
        </div>
      </div>
    )
  }

  /**
   * Apply search filter.
   *
   * @param search
   */
  searchFilter(search) {
    let state    = this.state
    state.search = search
    state.page   = 1
    this.setState({search})
    this.loadObservations(state)
  }

  /**
   * Apply collection filter.
   *
   * @param selectedCollection
   */
  collectionFilter(selectedCollection) {
    let state                = this.state
    state.selectedCollection = parseInt(selectedCollection)
    state.page               = 1

    let disableGroups = state.selectedCollection !== 0

    this.setState({selectedCollection, disableGroups})
    this.loadObservations(state)
  }

  /**
   * Apply categories filter.
   *
   * @param selectedCategory
   */
  categoriesFilter(selectedCategory) {
    let state              = this.state
    state.selectedCategory = selectedCategory
    state.page             = 1
    this.setState({selectedCategory})
    this.loadObservations(state)
  }

  /**
   * Apply groups filter.
   *
   * @param selectedGroup
   */
  groupsFilter(selectedGroup) {
    let state           = this.state
    state.selectedGroup = parseInt(selectedGroup)
    state.page          = 1

    let disableCollections = state.selectedGroup !== 0

    this.setState({selectedGroup, disableCollections})
    this.loadObservations(state)
  }

  /**
   * Apply advanced filters.
   *
   * @param selectedFilter
   */
  advancedFilter(selectedFilter) {
    let state            = this.state
    state.selectedFilter = parseInt(selectedFilter)
    state.page           = 1

    this.setState({selectedFilter})
    this.loadObservations(state)
  }

  /**
   * Apply newly created advanced filters.
   *
   * @param response
   */
  applyAdvancedFilters(response) {
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
  }

  /**
   * Change the view per page value.
   *
   * @param perPage
   */
  changePerPage(perPage) {
    let state     = this.state
    state.perPage = perPage
    state.page    = 1
    this.setState({perPage, page: 1})
    this.loadObservations(state)
  }

  /**
   * Render filter bar.
   *
   * @returns {XML}
   */
  _renderFilters() {
    let params = this.getParams(this.state, true)
    let query  = ''
    Object.keys(params).map(key => {
      if (params[key]) {
        if (typeof params[key] === 'object') {
          params[key] = JSON.stringify(params[key])
        }
        query += `&${key}=${params[key]}`
      }
    })

    return (
      <div className="columns is-multiline">
        <div className="column is-4">
          <div className="field">
            <label className="label">Search</label>
            <div className="control">
              <input type="search"
                     className="input"
                     placeholder="Search"
                     onChange={({target}) => this.searchFilter(target.value)}
                     value={this.state.search}
              />
            </div>
          </div>
        </div>

        <div className="column is-4">
          <div className="field">
            <label className="label">Species</label>

            <div className="control">
              <span className="select is-full-width">
                <select value={this.state.selectedCategory}
                        onChange={({target}) => this.categoriesFilter(target.value)}>
                  <option value={''}>All Species</option>
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
            <label className="label">Collections</label>
            <div className="control is-positioned-relatively">
              <span className="select is-full-width">
                <select
                  value={this.state.selectedCollection}
                  onChange={({target}) => this.collectionFilter(target.value)}
                  disabled={this.state.disableCollections}>
                  <option value={0}>None</option>
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
              {this.state.disableCollections ?
                <p className="help is-warning is-pulled-up">Collections filter can only be applied when the groups filter is not applied.</p>
                : null}
            </div>
            {this.state.collections.length === 0 && !this.state.loading ?
              <p className="help is-warning">You currently have no collections. Use <i className="fa fa-star"></i> to create one.
              </p>
              : null}
          </div>
        </div>

        <div className="column is-4">
          <div className="field">
            <label className="label">Group</label>

            <div className="control is-positioned-relatively">
              <span className="select is-full-width">
                <select value={this.state.selectedGroup}
                        onChange={({target}) => this.groupsFilter(target.value)}
                        disabled={this.state.disableGroups}>
                  <option value={0}>My observations only</option>
                  {this.state.groups.map(group => {
                    return (
                      <option key={group.id}
                              value={group.id}>
                        {group.name}
                      </option>
                    )
                  })}
                </select>
              </span>
              {this.state.disableGroups ?
                <p className="help is-warning is-pulled-up">Group filter can only be applied when the collections filter is not applied.</p>
                : null}
            </div>
          </div>
        </div>

        <div className="column is-4">
          <div className="field">
            <label className="label">Saved Advanced Filters</label>

            <div className="control">
              <span className="select is-full-width">
                <select value={this.state.selectedFilter}
                        onChange={({target}) => this.advancedFilter(target.value)}>
                  <option value={0}>None</option>
                  {this.state.filters.map(filter => {
                    return (
                      <option key={filter.id}
                              value={filter.id}>
                        {filter.name}
                      </option>
                    )
                  })}
                </select>
              </span>
            </div>
          </div>
        </div>

        <div className="column is-2">
          <div className="mt-3">
            <button type="button" className="button is-primary is-block" onClick={() => {
              this.setState({showAdvancedFiltersModal: true})
              if (this._advancedFilterState) {
                setTimeout(() => {
                  this.advancedFilterModal.reapplyState(this._advancedFilterState)
                }, 200)
              }
            }}>
              Advanced Filters
            </button>
          </div>
        </div>

        {this.state.total > 0 ?
          <div className="column is-2 has-text-right">
            <div className="mt-3">
              <Dropdown right={true} isBlock={true} trigger={(
                <button className="button is-block" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span className="icon is-small">
                    <i className="fa fa-download"></i>
                  </span>
                  <span>Download</span>
                  <span className="icon is-small">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              )}>
                <a href={`/services/download/observations/tsv?${query}`} className="dropdown-item">
                  TSV Format
                </a>
                <a href={`/services/download/observations/csv?${query}`} className="dropdown-item">
                  CSV Format
                </a>
              </Dropdown>
            </div>
          </div>
          : null}

      </div>
    )
  }

  /**
   * Save advanced filters state to reapply later when reopening the modal.
   * This is used to regenerate any applied advanced filters.
   *
   * @param {object} state
   */
  saveFilterState(state) {
    this._advancedFilterState = state
  }

  /**
   * render.
   *
   * @returns {XML}
   */
  render() {
    const total = this.state.total
    return (
      <AccountView>
        <div className="columns">
          <div className="column">
            <h3 className="title is-3">Observations</h3>
          </div>
          <div className="column has-text-right-desktop">
            <p>
              Show <span className="select is-small">
              <select value={this.state.perPage}
                      onChange={({target}) => this.changePerPage(target.value)}>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="96">96</option>
              </select>
            </span> per page. Total of {total} observations found
            </p>
          </div>
        </div>

        {this._renderFilters()}

        {this.state.observations.length === 0 ? this.getEmptyMessage() : null}
        <div className="columns is-multiline">
          {this.state.observations.map(this._renderObservation.bind(this))}
        </div>

        {this._renderPageLinks()}

        <AdvancedFiltersModal
          ref={ref => this.advancedFilterModal = ref}
          visible={this.state.showAdvancedFiltersModal}
          onCloseRequest={() => this.setState({showAdvancedFiltersModal: false})}
          onCreate={this.applyAdvancedFilters.bind(this)}
          onStateChange={this.saveFilterState.bind(this)}
          withObservations={false}
          resetForm={false}
          showCount={false}
        />

        <Spinner visible={this.state.pageLoading}/>
      </AccountView>
    )
  }
}
