import React, {Component} from 'react'
import marked from 'marked'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import LinksSidebar from '../components/LinksSidebar'
import Spinner from '../components/Spinner'
import PropTypes from 'prop-types'
import KnowledgeSidebarLinks from '../helpers/KnowledgeSidebarLinks'
import Scene from './Scene'

export default class KnowledgeScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      loading: true
    }
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

    let title      = this.props.title || 'About Us'
    document.title = `${title} - TreeSnap`
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

KnowledgeScene.propTypes = {
  docPath: PropTypes.string.isRequired,
  title  : PropTypes.string
}

KnowledgeSidebarLinks.defaultProps = {
  title: false
}
