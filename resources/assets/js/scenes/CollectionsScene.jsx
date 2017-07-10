import React, {Component} from 'react'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import Tooltip from '../components/Tooltip'

export default class CollectionsScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            collections: [],
            loading    : true
        }

        this.account = window.location.pathname.toLowerCase().indexOf('account') !== -1

        document.title = "User Saved Collections"
    }

    componentWillMount() {
        axios.get('/web/collections').then(response => {
            this.setState({
                collections: response.data.data,
                loading    : false
            })
        }).catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }

    deleteCollection(collection) {
        if (!confirm(`Are you sure you want to delete ${collection.label}?`)) {
            return
        }

        axios.delete(`/collection/${collection.id}`).then(response => {
            const id = parseInt(response.data.data.id)
            this.setState({
                collections: this.state.collections.filter(collection => collection.id !== id)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    _renderRow(collection) {
        return (
            <tr key={collection.id}>
                <td>{collection.label}</td>
                <td>{collection.observations_count}</td>
                <td>{collection.users_count - 1} users</td>
                <td className="has-text-right">
                    {/*<button type="button" className="button is-small is-info">
                        <span className="icon is-small">
                            <Tooltip label="Share">
                                <i className="fa fa-share"></i>
                            </Tooltip>
                        </span>
                    </button>*/}
                    <button type="button"
                            className="button is-small is-danger"
                            onClick={() => this.deleteCollection(collection)}>
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
                <h1 className="title is-3">Manage Collections</h1>
                <div className="box">
                    {this.state.collections.length > 0 ?
                        <table className="table is-striped mb-none">
                            <thead>
                            <tr>
                                <th>Label</th>
                                <th>Observations</th>
                                <th>Shared With</th>
                                <th className="has-text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.collections.map(this._renderRow.bind(this))}
                            </tbody>
                        </table>
                        :
                        <p>
                            You have not created any collections yet.
                            You can create new collections in the {
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