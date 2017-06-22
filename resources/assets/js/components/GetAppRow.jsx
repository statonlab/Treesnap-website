import React, {Component} from 'react'

export default class GetAppRow extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="home-section">
                <div className="container is-small has-text-centered">
                    <h4 className="title is-4 has-text-centered">Available now for Android and iOS!</h4>
                    <a href="https://play.google.com/store/apps/details?id=com.treesource">
                        <img
                            src="/images/google-play-badge.png"
                            alt="google play badge"
                            className="google-badge-img"/>
                    </a>
                    <a href="https://itunes.apple.com/us/app/treesnap/id1226499160?mt=8">
                        <img
                            src="/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg"
                            alt="apple"
                            className="apple-badge-img"/>
                    </a>
                </div>
            </div>
        )
    }

}
