import React, {Component} from 'react'

export default class RecentUpdates extends Component {
  render() {
    return (
      <div className="recent-updates">
        <div className="container">
          <h2 className="title is-3 text-white has-text-centered">Recent Updates</h2>
          <div className="update-marquee">
            <div className="update-card">
              <h1>The Hemlock survey has been updated to support the Lingering Hemlock Protocol</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
