import React, {Component} from 'react'
import ObservationCard from '../../components/ObservationCard'

export default class CurateScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            observations      : [],
            search            : '',
            searchTermCategory: 'all',
            loading           : true
        }
    }

    componentDidMount() {
        axios.get('/observations/3').then(response => {
            this.setState({
                observations: response.data.data,
                loading     : false
            })
        }).catch(error => {
            this.setState({loading: false})
            console.log('Network Error: ', error)
        })
    }

    searchFilter(search) {
        this.setState({search})
    }

    searchCategoryFilter(searchTermCategory) {
        this.setState({searchTermCategory})
    }

    _renderFilters() {
        return (
            <div className="columns is-multiline">
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
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="field">
                        <div className="control">
                            <span className="select is-full-width">
                                <select>
                                    <option value={0}>Any Status</option>
                                    <option value={1}>Confirmed by anyone</option>
                                    <option value={1}>Unconfirmed yet</option>
                                    <option value={2}>Confirmed as correct</option>
                                    <option value={3}>Confirmed as incorrect</option>
                                    <option value={4}>Confirmed by me</option>
                                    <option value={5}>Confirmed by others</option>
                                    <option value={6}>Confirmed as correct by me</option>
                                    <option value={7}>Confirmed as incorrect by me</option>
                                    <option value={8}>Confirmed as correct by others</option>
                                    <option value={9}>Confirmed as incorrect by others</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="column is-4">
                    <div className="field">
                        <div className="control">
                            <span className="select is-full-width">
                                <select>
                                    <option value={0}>New observations only</option>
                                    <option value={1}>Observations I have seen before but did not confirm</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _renderObservation(observation) {
        return (
            <div className="column is-4-desktop is-6-tablet" key={observation.observation_id}>
                <ObservationCard observation={observation}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1 className="title is-3">Confirm Observations</h1>
                <p><b>Filter</b></p>

                {this._renderFilters()}

                <div className="columns is-multiline">
                    {this.state.observations.map(observation => {
                        return this._renderObservation(observation)
                    })}
                </div>
            </div>
        )
    }
}