import React, {Component} from 'react'
import ObservationCard from '../../components/ObservationCard'
import Path from '../../helpers/Path'
import Spinner from '../../components/Spinner'
import EmailModal from '../components/EmailModal'

export default class CurateScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            observations      : [],
            search            : '',
            searchTermCategory: 'all',
            loading           : false,
            currentPage       : 1,
            total             : 0,
            pages             : [],
            perPage           : 3,
            pageLoading       : true,
            categories        : [],
            selectedCategory  : 0,
            selectedStatus    : 0,
            showEmail         : false,
            user              : {},
            contact           : {
                to         : {
                    user_id: 0,
                    email  : ''
                },
                from       : '',
                observation: {}
            }
        }
    }

    componentDidMount() {
        let page = this.getBrowserPage()
        this.loadObservations(Object.assign({}, this.state, {page}))
        this.loadUser()
        this.loadCategories()
    }

    loadObservations(state) {
        this.setState({loading: true})

        if (typeof state === 'undefined') {
            state = this.state
        }

        axios.get(`/admin/web/curate/observations/${state.perPage}`, {
            params: {
                page    : state.page,
                search  : state.search,
                category: state.selectedCategory === '0' || !state.selectedCategory ? '' : state.selectedCategory,
                status  : state.selectedStatus === '0' || !state.selectedStatus ? '' : state.selectedStatus
            }
        }).then(response => {
            let data     = response.data.data
            let newState = {
                loading     : false,
                observations: data.observations,
                currentPage : data.currentPage,
                total       : data.total,
                hasMorePages: data.hasMorePages,
                perPage     : state.perPage,
                pages       : this.generatePages(data.total, state.perPage),
                pageLoading : false
            }
            this.setState(newState)
            this.setBrowserHistory(newState)
        }).catch(error => {
            this.setState({loading: false})
            console.log('Network Error: ', error)
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
     * Apply search filter.
     * @param search
     */
    searchFilter(search) {
        let state    = this.state
        state.search = search
        state.page   = 1
        this.loadObservations(state)

        this.setState({search, page: 1})
    }

    /**
     * Set browser history based on current state.
     * @param state
     */
    setBrowserHistory(state) {
        this.props.history.replace(`/curate/?page=${state.currentPage}`)
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
        if (!this.state.hasMorePages) {
            return
        }

        let page = this.state.currentPage + 1
        this.goToPage(page)
    }

    /**
     * Go to the previous page.
     */
    prevPage() {
        if (this.state.currentPage === 1) {
            return
        }

        let page = this.state.currentPage - 1
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
    }

    /**
     * Change the selected species category.
     *
     * @param selectedCategory
     */
    changeCategory(selectedCategory) {
        this.setState({selectedCategory, page: 1})
        let state              = this.state
        state.selectedCategory = selectedCategory
        state.page             = 1
        this.loadObservations(state)
    }

    /**
     * Change selected status.
     *
     * @param selectedStatus
     */
    changeStatus(selectedStatus) {
        this.setState({selectedStatus, page: 1})
        let state            = this.state
        state.page           = 1
        state.selectedStatus = selectedStatus
        this.loadObservations(state)
    }

    /**
     * Change selected perPage.
     *
     * @param perPage
     */
    changePerPage(perPage) {
        perPage = parseInt(perPage)

        this.setState({perPage, page: 1})
        let state     = this.state
        state.page    = 1
        state.perPage = perPage
        this.loadObservations(state)
    }

    /**
     * Render the filters bar.
     *
     * @returns {XML}
     * @private
     */
    _renderFilters() {
        return (
            <div className="columns is-multiline">
                <div className="column is-4">
                    <div className="field">
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

                <div className="column is-4">
                    <div className="field">
                        <div className="control">
                            <span className="select is-full-width">
                                <select
                                    value={this.state.selectedCategory}
                                    onChange={({target}) => this.changeCategory(target.value)}
                                >
                                    <option value={0}>Any Species</option>
                                    {this.state.categories.map((category, index) => {
                                        return <option key={index} value={category.value}>{category.label}</option>
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
     * Render observation card.
     *
     * @param observation
     * @returns {XML}
     * @private
     */
    _renderObservation(observation) {
        return (
            <div className="column is-4-desktop is-6-tablet" key={observation.observation_id}>
                <ObservationCard
                    observation={observation}
                    showMarks={true}
                    loading={this.state.loading}
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
                />
            </div>
        )
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
                   disabled={this.state.currentPage === 1}>
                    Previous
                </a>
                <ul className="pagination-list">
                    <li>
                        Page <span className="select is-small">
                        <select value={this.state.currentPage} onChange={({target}) => this.goToPage(target.value)}>
                            {this.state.pages.map(page => {
                                return <option value={page} key={`page_${page}`}>{page}</option>
                            })}
                        </select>
                    </span> out of {this.state.pages.length} pages
                    </li>
                </ul>
                <a href="javascript:;"
                   className="pagination-next"
                   onClick={this.nextPage.bind(this)}
                   disabled={!this.state.hasMorePages}>
                    Next
                </a>
            </nav>
        )
    }

    render() {
        return (
            <div>
                <Spinner visible={this.state.pageLoading}/>

                <EmailModal visible={this.state.showEmail}
                            contact={this.state.contact}
                            observation={this.state.contact.observation}
                            onCloseRequest={() => this.setState({showEmail: false})}/>

                <h1 className="title is-3">Curate Observations</h1>

                <div className="columns flex-v-center mb-none">
                    <div className="column">
                        <p>
                            <b>Filter</b>
                        </p>
                    </div>
                    <div className="column has-text-right">
                        <p>
                            {this.state.total} total observations.
                            Showing
                            <span className="select is-small ml-0 mr-0">
                                <select value={this.state.perPage}
                                        onChange={({target}) => this.changePerPage(target.value)}>
                                    <option value={3}>3</option>
                                    <option value={6}>6</option>
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={48}>48</option>
                                </select>
                            </span>
                            per page.
                        </p>
                    </div>
                </div>


                {this._renderFilters()}

                <div className="columns is-multiline">
                    {this.state.observations.length === 0 ?
                        <p>No results found</p>
                        : null}
                    {this.state.observations.map(this._renderObservation.bind(this))}
                </div>

                {this._renderPageLinks()}
            </div>
        )
    }
}