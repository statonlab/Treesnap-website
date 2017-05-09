/**
 * Treesnap Welcome splash screen
 */
import ReactDOM from 'react-dom'
import React, {Component} from 'react'
import Navbar from './components/Navbar'

export default class Welcome extends Component {

    /**
     * Render the scene.
     *
     * @returns {XML}
     */

    render() {
        return (
            <div>
                <Navbar />

                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            Help our nation’s trees! Invasive diseases and pests threaten the health of America’s
                            forests. Scientists are working to understand what allows some individual trees to survive,
                            but they need to find healthy, resilient trees in the forest to study. That’s where
                            concerned foresters, landowners, and citizens (you!) can help. Tag trees you find in your
                            community, on your property, or out in the wild to help us understand Forest health!
                            The Treesnap app is a means for participants to record the location and health of particular
                            tree species of interest. Scientists use the collected information to locate candidates for
                            genetic sequencing and breeding programs. To learn more about the Treesnap project, visit
                            our website.
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <a href="/map">
                                <h2 className="title">
                                    Map
                                </h2>
                                <figure className="image">
                                    <img src="images/map.png"/>
                                    Proceed to the map!
                                </figure>
                            </a>

                        </article>
                    </div>

                    <div className="tile is-vertical is-6">
                        <div className="tile is-parent">
                            <article className="tile is-child box">
                                Get the app!
                                The app is currently in closed beta. This means that an invite is necessary to download
                                the app.
                                The Treesnap mobile app will be available for download on August 1st 2017.
                            </article>
                        </div>
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <article className="tile is-child box">
                                    Sample observation 1
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    Sample observation 1
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Welcome/>, document.getElementById('welcome'))