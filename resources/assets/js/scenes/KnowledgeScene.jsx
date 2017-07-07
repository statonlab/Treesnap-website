import React, {Component} from 'react'
import marked from 'marked'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import LinksSidebar from '../components/LinksSidebar'
import Spinner from '../components/Spinner'
import PropTypes from 'prop-types'
import KnowledgeSidebarLinks from '../helpers/KnowledgeSidebarLinks'

export default class KnowledgeScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            loading: true
        }

        document.title = "TreeSnap - About Us"
    }

    componentDidMount() {
        window.fixHeight()

        axios.get(this.props.docPath).then(response => {
            this.setState({content: response.data.data})
        }).catch(error => {
            console.log(error)
        }).then(() => {
            this.setState({loading: false})
            window.fixHeight()
        })
    }

    render() {
        return (
            <div className="document">
                <Navbar/>
                <Spinner visible={this.state.loading}/>
                <div className="home-section short-content">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-3">
                                <LinksSidebar links={KnowledgeSidebarLinks} title="Knowledge Base"/>
                            </div>
                            <div className="column">
                                <div className="box body">
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
KnowledgeScene.PropTypes = {
    docPath: PropTypes.string.isRequired
}