import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import HomeJumbotron from '../components/HomeJumbotron'
import FeaturesList from '../components/FeaturesList'
import HomeFooter from '../components/HomeFooter'

export default class Welcome extends Component {
  constructor(props) {
    super(props)

    document.title = 'TreeSnap - Help Our Nation\'s Trees!'
  }

  /**
   * Render the scene.
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <div className="home">
          <Navbar home={true}/>
          <HomeJumbotron/>
        </div>
        <FeaturesList/>
        <HomeFooter/>
      </div>
    )
  }
}