import React, {Component} from 'react'
import ObservationCard from '../components/ObservationCard'
import Spinner from '../components/Spinner'
import Path from '../helpers/Path'
import AccountView from '../components/AccountView'

export default class MyObservationsScene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            observations      : [],
            collections       : [],
            selectedCollection: 0,
            page              : 1,
            last_page         : 59,
            next_page_url     : '',
            prev_page_url     : '',
            per_page          : 6,
            total             : 0,
            page_loading      : true,
            pages             : [],
            loading           : false,
            count             : 0,
            search            : [],
            categories        : [],
            selectedCategory  : 0
        }

        document.title = 'My Observations'
    }

    /**
     * Get the user record from the server.
     */
    componentDidMount() {
        let page   = this.getBrowserPage()
        let state  = this.state
        state.page = page
        this.loadObservations(state)
        this.loadCollections()
        window.fixHeight()
    }

    /**
     * Get observations from server.
     *
     * @param state
     */
    loadObservations(state) {
        this.setState({loading: true})

        axios.get('/web/user/observations', {
            params: {
                page       : state.page,
                per_page   : state.per_page,
                search_term: state.search || '',
                category   : state.selectedCategory || '',
                collection : state.selectedCollection || ''
            }
        }).then(response => {
            const data  = response.data.data
            const state = {
                observations  : data.data,
                page          : data.current_page,
                next_page_url : data.next_page_url,
                prev_page_url : data.prev_page_url,
                total         : data.total,
                per_page      : data.per_page,
                has_more_pages: data.has_more_pages,
                count         : data.count,
                page_loading  : false,
                pages         : this.generatePages(data.total, data.per_page),
                loading       : false
            }
            this.setState(state)
            this.setBrowserHistory(state)
        }).catch(error => {
            this.setState({page_loading: false})
            alert('Network Error. Please contact us to resolve this issue.')
        })
    }

    loadCollections() {
        axios.get('/web/collections').then(response => {
            const collections = response.data.data.map(collection => {
                return {
                    label: collection.label,
                    value: collection.id
                }
            })
            this.setState({collections})
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
        this.props.history.replace(`/account/observations/?page=${state.page}`)
    }

    /**
     * Get page number from the browser url.
     * @returns {*}
     */
    getBrowserPage() {
        let params = Path.parseUrl(this.props.history.location.search)
        if (typeof params.page !== 'undefined') {
            let p = parseInt(params.page)
            if (!isNaN(p)) {
                return p
            }
        }

        return 1
    }

    /**
     * Go to the next page.
     */
    nextPage() {
        if (!this.state.has_more_pages) {
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

        document.body.scrollTop = 0
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
                    : null }
                <a href="javascript:;"
                   className="pagination-next"
                   onClick={this.nextPage.bind(this)}
                   disabled={!this.state.has_more_pages}>
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
                    collections={this.state.collections}
                    onCollectionCreated={collection => {
                        let exists = !observation.collections.every(c => c.id !== collection.id)

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
                    <p>You have not submitted any observations yet.</p>
                    <p>
                        {/* Unfortunately the links have to be structured this way or otherwise the spacing
                         ** will be wrong and words wouldn't get separated by a space
                         **/}
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

    searchFilter(search) {
        let state    = this.state
        state.seatch = search
        this.setState({search})
        this.loadObservations(state)
    }

    collectionFilter(selectedCollection) {
        let state                = this.state
        state.selectedCollection = selectedCollection
        this.setState({selectedCollection})
        this.loadObservations(state)
    }

    categoriesFilter(selectedCategory) {
        let state              = this.state
        state.selectedCategory = selectedCategory
        this.setState({selectedCategory})
        this.loadObservations(state)
    }

    changePerPage(per_page) {
        let state      = this.state
        state.per_page = per_page
        state.page     = 1
        this.setState({per_page, page: 1})
        this.loadObservations(state)
    }

    /**
     * Render filter bar.
     *
     * @returns {XML}
     */
    _renderFilters() {
        return (
            <div className="columns is-multiline flex-v-center">
                <div className="column is-4">
                    <p><b>Filters</b></p>
                </div>
                <div className="column is-8 has-text-right">
                    <span className="select is-small">
                        <select value={this.state.per_page}
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
                                        <option value={0}>All Collections</option>
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
                    : null }
                <div className="column is-4">
                    <div className="field">
                        <div className="control">
                            <span className="select is-full-width">
                                <select value={this.state.selectedCategory}
                                        onChange={({target}) => this.categoriesFilter(target.value)}>
                                    <option value={0}>All Species</option>
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
            </div>
        )
    }

    /**
     * render.
     *
     * @returns {XML}
     */
    render() {
        const showing = this.state.count
        const total   = this.state.total
        return (
            <AccountView>
                <div className="columns">
                    <div className="column">
                        <h3 className="title is-3">My Observations</h3>
                    </div>
                    <div className="column has-text-right">
                        <p>
                            Showing {showing} out of {total} observations
                        </p>
                    </div>
                </div>

                {this._renderFilters()}

                {this.state.observations.length === 0 ? this.getEmptyMessage() : null}
                <div className="columns is-multiline">
                    {this.state.observations.map(this._renderObservation.bind(this))}
                </div>

                {this._renderPageLinks()}

                <Spinner visible={this.state.page_loading}/>
            </AccountView>
        )
    }
}