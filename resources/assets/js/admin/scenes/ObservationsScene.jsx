import React, {Component} from 'react'
import Spinner from '../../components/Spinner'
import ObservationCard from '../../components/ObservationCard'
import Path from '../../helpers/Path'

export default class ObservationsScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading     : true,
            observations: [],
            total       : 0,
            page        : 0,
            perPage     : 6,
            pages       : []
        }
    }

    /**
     * Get observations from server.
     */
    componentWillMount() {
        axios.get('/observations').then(response => {
            this.setState({loading: false})
            this.paginate(response.data.data)
        }).catch(error => {
            this.setState({loading: false})
            console.log(error)
        })

        this.history = this.props.history
    }

    paginate(observations) {
        this.allObservations       = observations
        let total                  = observations.length
        let {page, perPage, pages} = this.preLoadPage(total)

        this.setState({
            observations: this.getPage(page),
            total,
            page,
            perPage,
            pages
        })
    }

    preLoadPage(total) {
        let params  = Path.parseUrl(this.history.location.search)
        let page    = 0
        let perPage = this.state.perPage

        if (typeof params.view !== 'undefined') {
            params.view = parseInt(params.view)
            if (params.view > 100 || params.view < 6) {
                perPage = 6
            } else {
                perPage = params.view
            }
        }

        let pages = this.generatePages(total, perPage)
        let max = pages.length


        if (typeof params.page !== 'undefined') {
            page = parseInt(params.page) - 1

            if (page > max || page < 0) {
                page = 0
            }
        }

        this.history.replace(`/observations?page=${page + 1}&view=${perPage}`)

        return {
            page,
            perPage,
            pages
        }
    }

    generatePages(total, perPage) {
        let pages = []

        if (typeof total === 'undefined') {
            total = this.state.total
        }

        if (typeof perPage === 'undefined') {
            perPage = this.state.perPage
        }

        for (let i = 1; i <= Math.ceil(total / perPage); i++) {
            pages.push(i)
        }

        return pages
    }

    getPage(page) {
        let perPage = this.state.perPage
        let start   = perPage * page
        let end     = start + perPage
        return this.allObservations.slice(start, end)
    }

    nextPage() {
        // Don't flip forward if we reached the last page
        if (this.state.page >= Math.ceil(this.state.total / this.state.perPage) - 1) {
            return
        }

        let page = this.state.page + 1
        this.goToPage(page)
    }

    previousPage() {
        // Don't flip back if we are at the first page
        if (this.state.page === 0) {
            return
        }

        let page = this.state.page - 1
        this.goToPage(page)
    }

    goToPage(page) {
        // Don't compute unless the page actually changed
        if (this.state.page === page) {
            return
        }

        this.setState({
            observations: this.getPage(page),
            page
        })

        this.history.push(`/observations?page=${page + 1}&view=${this.state.perPage}`)
    }

    render() {
        let isLastPage  = this.state.page >= Math.ceil(this.state.total / this.state.perPage) - 1
        let isFirstPage = this.state.page === 0
        this.generatePages()
        return (
            <div>
                <Spinner visible={this.state.loading}/>
                <div className="columns flex-v-center">
                    <div className="column">
                        <h1 className="title is-3"> Observations</h1>
                    </div>
                    <div className="column has-text-right">
                        <p>{this.state.total} Total Observations</p>
                    </div>
                </div>

                <div className="columns is-multiline">
                    {this.state.observations.map((observation, index) => {
                        return (
                            <div key={index} className="column is-4-widescreen is-6-desktop is-12-tablet">
                                <ObservationCard observation={observation}/>
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
                            {this.state.pages.map(page => {
                                return (
                                    <li key={page}>
                                        <a className={`pagination-link${this.state.page === page - 1 ? ' is-current' : ''}`}
                                           onClick={() => this.goToPage.call(this, page - 1)}>
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