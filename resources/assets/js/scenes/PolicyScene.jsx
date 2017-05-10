import React, {Component} from 'react'
import marked from 'marked'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import KnowledgeSidebar from '../components/KnowledgeSidebar'

export default class PolicyScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        axios.get('/docs/privacy').then(response => {
            this.setState({content: response.data.data})
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="document">
                <Navbar/>
                <div className="home-section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-3-tablet is-2-desktop">
                                <KnowledgeSidebar/>
                            </div>
                            <div className="column">
                                <div className="box"
                                     dangerouslySetInnerHTML={{__html: marked(this.state.content)}}>
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