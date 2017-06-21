import React, {Component} from 'react'
import Spinner from '../../components/Spinner'
import {Link} from 'react-router-dom'
import Tooltip from '../../components/Tooltip'

export default class CollectionsScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            collections: [],
            loading    : true
        }
    }

    componentWillMount() {
        axios.get('/collections').then(response => {
            this.setState({collections: response.data.data})
        }).catch(error => {
            console.log(error)
        }).then(() => {
            this.setState({loading: false})
        })
    }

    _renderRow(collection) {
        return (
            <tr key={collection.id}>
                <td>{collection.label}</td>
                <td>{collection.observations_count}</td>
                <td>{collection.users_count - 1} users</td>
                <td className="has-text-right">
                    <button type="button" className="button is-small is-info">
                        <Tooltip label="Share">
                            <i className="fa fa-share"></i>
                        </Tooltip>
                    </button>
                    <button type="button" className="button is-small is-danger ml-0">
                        <Tooltip label="Delete">
                        <i className="fa fa-times"></i>
                        </Tooltip>
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
                            You can create new collections in the <Link to="/observations">Observations</Link> page.
                        </p>
                    }
                </div>
                <Spinner visible={this.state.loading}/>
            </div>
        )
    }
}