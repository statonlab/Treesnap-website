import React from 'react'
import Navbar from '../components/Navbar'
import HomeJumbotron from '../components/HomeJumbotron'
import FeaturesList from '../components/FeaturesList'
import RecentUpdates from '../components/RecentUpdates'
import HomeFooter from '../components/HomeFooter'
import Leaderboard from '../components/Leaderboard'
import TwitterFeed from '../components/TwitterFeed'
import ObservationFeed from '../components/ObservationsFeed'
import Scene from './Scene'
import Dropdown from '../components/Dropdown'
import User from '../helpers/User'



export default class Welcome extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      loading: true,
    }
    document.title = 'TreeSnap - Help Our Nation\'s Trees!'
  }
  componentDidMount() {
    axios.get('/web/user/status').then(response => {
      let data = response.data.data
      this.setState({
        isLoggedIn: data.logged_in,
      })
    }).catch(error => {
      console.log(error)
    })
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
        <div className="home-section bg-dark">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h3 className={'title is-3 bg-dark has-text-centered mb-none'}>Leaderboard</h3>
                <p className="has-text-centered text-dark-muted mb-0">Top Submitters of All Time</p>
                <Leaderboard limit={5}/>
              </div>
              <div className="column">
                <h3 className={'title is-3 bg-dark has-text-centered mb-none'}>Observation Feed</h3>
                <p className="has-text-centered text-dark-muted mb-0">Latest Observations</p>
                <ObservationFeed/>
              </div>
              <div className="column">
                <div className="update-row">
               <h3 className={'title is-3 bg-dark has-text-centered mr-3 mb-none'}>Recent Updates</h3>
                </div>
               <p className="has-text-centered text-dark-muted mb-0">Latest Updates from <a target="_blank"  href="https://staton-lab-portfolio.web.app/">Staton Lab</a> </p>
               <TwitterFeed/>
              </div>
            </div>
            </div>
            
        </div>
        <FeaturesList/>
        <HomeFooter/>
      </div>
    )
  }
}
