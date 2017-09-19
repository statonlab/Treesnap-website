import React, {Component} from 'react'

export default class GetAppRow extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="is-small mt-3 has-text-centered-mobile">
        <a href="https://itunes.apple.com/us/app/treesnap/id1226499160?mt=8">
          <img
            src="/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg"
            alt="apple"
            className="apple-badge-img"/>
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.treesource">
          <img
            src="/images/google-play-badge.png"
            alt="google play badge"
            className="google-badge-img"/>
        </a>
      </div>
    )
  }

}
