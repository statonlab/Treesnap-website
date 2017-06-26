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
        }).catch(error => {
            this.setState({loading: false})
            if (error.response && error.response.status === 404) {
                console.log('Not Found')
                window.location.replace('/no-match')
            }
        })
    }


    render() {
        return (
            <div>
                <Navbar/>
                <Spinner visible={this.state.loading}/>
                <div className="home-section short-content">
                    <div className="container">
                        {this.state.observation !== null ?
                            <ObservationDetails observation={this.state.observation}/>
                            : null}
                    </div>
                </div>
                <HomeFooter/>
            </div>
        )
    }
}
