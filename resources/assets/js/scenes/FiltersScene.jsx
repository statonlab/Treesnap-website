import React, {Component} from 'react'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import Tooltip from '../components/Tooltip'

export default class UsersScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filters: [],
            loading: true
        }

        this.account = window.location.pathname.toLowerCase().indexOf('account') !== -1

        document.title = "User Saved Filters"
    }

    componentWillMount() {
        axios.get('/web/filters').then(response => {
            this.setState({
                loading: false,
                filters: response.data.data
            })
        }).catch(error => {
            this.setState({loading: false})
        })

    }

    deleteFilter(e, filter) {
        e.preventDefault()

        if (!confirm(`Are you sure you want to delete "${filter.name}"?`)) {
            return
        }

        axios.delete(`/web/filter/${filter.id}`).then(response => {
            let filters = this.state.filters.filter(oldFilter => {
                return filter.id !== oldFilter.id
            })

            this.setState({filters})
        }).catch(error => {
            console.log(error.response)
        })
    }

    _renderRow(filter) {
        return (
            <tr key={filter.id}>
                <td>{filter.name}</td>
                <td className="has-text-right">
                    {/*<a className="button is-small is-warning mr-0">
                        <span className="icon is-small">
                            <Tooltip label="Edit">
                                <i className="fa fa-pencil" style={{color: '#fff'}}></i>
                            </Tooltip>
                        </span>
                    </a>*/}

                    <button type="button"
                            className="button is-small is-danger"
                            onClick={(e) => this.deleteFilter(e, filter)}>
                        <span className="icon is-small">
                            <Tooltip label="Delete">
                                <i className="fa fa-times"></i>
                            </Tooltip>
                        </span>
                    </button>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <h1 className="title is-3">Manage Advanced Filters</h1>
                <div className="box">
                    {this.state.filters.length !== 0 ?
                        <table className="table is-striped mb-none">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th className="has-text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.filters.map(this._renderRow.bind(this))}
                            </tbody>
                        </table>
                        :
                        <p className="text-muted">
                            You haven't created any filters yet.
                            You can create new filters in the {
                            this.account ? <Link to="/map">Map</Link> : <Link to="/observations">Observations</Link>
                        } page.
                        </p>
                    }
                </div>

                <Spinner visible={this.state.loading}/>
            </div>
        )
    }
}