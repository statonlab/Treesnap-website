import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import HomeJumbotron from '../components/HomeJumbotron'
import FeaturesList from '../components/FeaturesList'
import HomeFooter from '../components/HomeFooter'
import Leaderboard from '../components/Leaderboard'
import TwitterFeed from '../components/TwitterFeed'
import EventsList from '../components/EventsList'
import Scene from './Scene'

export default class Welcome extends Scene {
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
        <div className="home-section bg-dark">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="p-1">
                  <h3 className={'title is-3 bg-dark has-text-centered mb-none'}>Leaderboard</h3>
                  <p className="has-text-centered text-dark-muted mb-0">Top Submitters of All Time</p>
                  <Leaderboard limit={5}/>
                </div>
              </div>
              <div className="column">
                <div className="p-1">
                  <h3 className={'title is-3 bg-dark has-text-centered mb-none'}>Events</h3>
                  <p className="has-text-centered text-dark-muted mb-0">Upcoming Events</p>
                  <EventsList limit={3}/>
                </div>
              </div>
              <div className="column">
                <div className="p-1">
                  <h3 className={'title is-3 bg-dark has-text-centered mb-none'}>Tweets</h3>
                  <p className="has-text-centered text-dark-muted mb-0">Latest Tweets by @treesnapapp</p>
                  <TwitterFeed/>
                </div>
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
