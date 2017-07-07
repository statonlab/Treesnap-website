import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import Spinner from '../components/Spinner'
import ObservationDetails from '../components/ObservationDetails'

export default class ObservationScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading    : false,
            observation: null
        }
    }


    componentDidMount() {
        this.setState({loading: true})
        let id = this.props.match.params.id
        axios.get(`/web/observation/${id}`).then(response => {
            let data = response.data.data
            this.setState({
                observation: data,
                loading    : false
            })

            document.title = `${data.observation_category} (${data.observation_id}) | TreeSnap`
        }).catch(error => {
            this.setState({loading: false})
            if (error.response && error.response.status === 404) {
                console.log('Not Found')
                window.location.replace('/no-match')
            }
        })
    }

    _renderContent(observation) {
        if (observation === null) {
            return null
        }

        return (
            <div>
                <ObservationDetails observation={observation} showControls={true}/>

                <div className="columns">
                    <div className="column is-6">
                        <div className="box">
                            <h4 className="title is-5">Notes</h4>
                            <div className="field">
                                <div className="control">
                                    <textarea className="textarea" placeholder="Private Notes"></textarea>
                                </div>
                                <p className="help">You may add private notes to this observation by filling the text box above.</p>

                            </div>

                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary" type="button">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="box">
                            <h4 className="title is-5">Collections</h4>
                            {observation.collections.length === 0 ?
                                <p>You have not added this observation to any collections yet.</p>
                                : null}
                            {observation.collections.map(collection => {
                                return (
                                    <div className="flexbox flex-space-between" key={collection.id}>
                                        <p>{collection.label}</p>
                                        <button className="button is-small is-outlined is-danger">Remove</button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="box">
                            <h4 className="title is-5">Flags</h4>
                            {observation.flags.length === 0 ?
                                <p>You have not flagged this observation.</p>
                                : null}
                            {observation.flags.map(flag => {
                                return (
                                    <div className="flexbox flex-space-between" key={flag.id}>
                                        <div>
                                            <p>
                                                You have flagged this observation as: "<b>{flag.reason}</b>"
                                            </p>
                                            <p>
                                                {flag.comments}
                                            </p>
                                        </div>
                                        <button className="button is-danger is-outlined is-small">Remove Flag</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Spinner visible={this.state.loading}/>
                <div className="home-section short-content">
                    <div className="container">
                        {this._renderContent(this.state.observation)}
                    </div>
                </div>
                <HomeFooter/>
            </div>
        )
    }
}
