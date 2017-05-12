import React, {Component} from 'react'
import marked from 'marked'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import KnowledgeSidebar from '../components/KnowledgeSidebar'
import Spinner from '../components/Spinner'

export default class PolicyScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/docs/privacy').then(response => {
            this.setState({content: response.data.data})
        }).catch(error => {
            console.log(error)
        }).then(() => {
            this.setState({loading: false})
        })
    }

    render() {
        return (
            <div className="document">
                <Navbar/>
                <Spinner visible={this.state.loading}/>
                <div className="home-section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-3">
                                <KnowledgeSidebar/>
                            </div>
                            <div className="column">
                                <div className="box">
                                    <div dangerouslySetInnerHTML={{__html: marked(this.state.content)}}></div>
                                    <Spinner visible={this.state.loading} inline={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </div>
        )
    }
}