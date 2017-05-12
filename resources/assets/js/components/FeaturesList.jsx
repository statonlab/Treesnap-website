import React, {Component} from 'react'

export default class FeaturesList extends Component {
    render() {
        return (
            <div className="home-section" style={{backgroundColor: '#fff', padding: '4rem 0'}}>
                <div className="container">
                    <h2 className="title is-3 featured-title">Application Features</h2>
                    <div className="tile is-ancestor">
                        <div className="tile is-parent">
                            <div className="tile is-child box feature-tile">
                                <div className="media">
                                    <div className="media-left">
                                        <img src="/images/flat-icons/earth-globe.png"
                                             alt="Man Icon"
                                             className="feature-icon"/>
                                    </div>
                                    <div className="media-content">
                                        <p className="title">Availability</p>
                                        <p className="feature-text">
                                            Treesnap is available for iOS and Android smart phones, and is
                                            <b> completely free</b>. The app will be available on the Apple AppStore
                                            and Google Play.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="tile is-child box feature-tile">
                                <div className="media">
                                    <div className="media-left">
                                        <img src="/images/flat-icons/folder.png"
                                             alt="Man Icon"
                                             className="feature-icon"/>
                                    </div>
                                    <div className="media-content">
                                        <p className="title">It's a Snap</p>
                                        <p className="feature-text">
                                            Come across an Ash, Hemlock, Chestnut, or White Oak in the woods?
                                            Record it with Treesnap and its geolocation will be shared with scientists to study it.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tile is-ancestor">
                        <div className="tile is-parent">
                            <div className="tile is-child box feature-tile">
                                <div className="media">
                                    <div className="media-left">
                                        <img src="/images/flat-icons/archives.png"
                                             alt="Man Icon"
                                             className="feature-icon"/>
                                    </div>
                                    <div className="media-content">
                                        <p className="title">Data Collection</p>
                                        <p className="feature-text">
                                            Treesnap is easy to use. Snap a photo, answer a few questions and be done in a couple of taps.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="tile is-child box feature-tile">
                                <div className="media">
                                    <div className="media-left">
                                        <img src="/images/flat-icons/transfer.png"
                                             alt="Man Icon"
                                             className="feature-icon"/>
                                    </div>
                                    <div className="media-content">
                                        <p className="title">Sync</p>
                                        <p className="feature-text">
                                            Create an account and sync your observations with the Treesnap server wirelessly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tile is-ancestor">
                        <div className="tile is-parent">
                            <div className="tile is-child box feature-tile">
                                <div className="media">
                                    <div className="media-left">
                                        <img src="/images/flat-icons/padlock.png"
                                             alt="Man Icon"
                                             className="feature-icon"/>
                                    </div>
                                    <div className="media-content">
                                        <p className="title">Privacy</p>
                                        <p className="feature-text">
                                            The GPS location of your trees is protected, and not revealed to outside parties.  Our map will only display the approximate location of each tree, or you can opt out of adding your data to the map entirely.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="tile is-child box feature-tile">
                                <div className="media">
                                    <div className="media-left">
                                        <img src="/images/flat-icons/teamwork-3.png"
                                             alt="Man Icon"
                                             className="feature-icon"/>
                                    </div>
                                    <div className="media-content">
                                        <p className="title">Contribute</p>
                                        <p className="feature-text">
                                            Information reported in Treesnap is used by real scientists. That Ash you've found might be the start of a completely new breeding program.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}