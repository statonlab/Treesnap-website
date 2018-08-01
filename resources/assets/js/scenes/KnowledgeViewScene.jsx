import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import LinksSidebar from '../components/LinksSidebar'
import Spinner from '../components/Spinner'
import PropTypes from 'prop-types'
import KnowledgeSidebarLinks from '../helpers/KnowledgeSidebarLinks'
import PartnerList from '../components/PartnerList'
import AboutUsView from '../components/AboutUsView'
import Scene from './Scene'

export default class KnowledgeViewScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      loading: false
    }
  }

  componentDidMount() {
    window.fixHeight()
    let title      = this.props.title
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
                {this.props.title == 'Partners' ?
                  (<PartnerList/>)
                  : null}
                {this.props.title == 'About Us' ?
                  <AboutUsView/>
                  : null}
                <Spinner visible={this.state.loading} inline={true}/>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter/>
      </div>
    )
  }
}

KnowledgeViewScene.propTypes = {
  title  : PropTypes.string
}

KnowledgeSidebarLinks.defaultProps = {
  title: false
}
