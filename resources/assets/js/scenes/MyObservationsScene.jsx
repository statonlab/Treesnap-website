import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import AccountLinks from '../helpers/AccountLinks'
import LinksSidebar from '../components/LinksSidebar'
import ObservationCard from '../components/ObservationCard'
import Spinner from '../components/Spinner'
import Path from '../helpers/Path'

export default class MyObservationsScene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            observations : [],
            page         : 1,
            last_page    : 59,
            next_page_url: '',
            prev_page_url: '',
            per_page     : 6,
            total        : 0,
            page_loading : true,
            pages        : [],
            loading      : false
        }
    }

    /**
     * Get the user record from the server.
     */
    componentDidMount() {
        let page   = this.getBrowserPage()
        let state  = this.state
        state.page = page
        this.loadObservations(state)
        window.fixHeight()
    }

    /**
     * Get observations from server.
     *
     * @param state
     */
    loadObservations(state) {
        this.setState({loading: true})

        axios.get('/user/observations', {
            params: {
                page: state.page
            }
        }).then(response => {
            const data  = response.data.data
            const state = {
                observations  : data.data,
                page          : data.current_page,
                next_page_url : data.next_page_url,
                prev_page_url : data.prev_page_url,
                total         : data.total,
                per_age       : data.per_page,
                has_more_pages: data.has_more_pages,
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
     * render.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Navbar/>
                <div className="home-section short-content">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-3">
                                <LinksSidebar links={AccountLinks} title="Members"/>
                            </div>
                            <div className="column is-9">
                                <div className="columns">
                                    <div className="column">
                                        <h3 className="title is-3">My Observations</h3>
                                    </div>
                                    <div className="column has-text-right">
                                        <p>
                                            Showing {this.state.per_page} out of {this.state.total} observations
                                        </p>
                                    </div>
                                </div>

                                {this.state.observations.length === 0 ? this.getEmptyMessage() : null}
                                <div className="columns is-multiline">
                                    {this.state.observations.map(this._renderObservation.bind(this))}
                                </div>

                                {this._renderPageLinks()}
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
                <Spinner visible={this.state.page_loading}/>
            </div>
        )
    }
}