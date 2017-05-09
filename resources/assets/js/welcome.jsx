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
                <div className="home">
                    <nav className="nav home-nav">
                        <div className="container is-small">
                            <div className="nav-left">
                                <a href="/" className="nav-item logo">
                                    <b>Tree</b><span style={{fontWeight: 300}}>Snap</span>
                                </a>
                            </div>

                            <div className="nav-center">
                                <a href="https://www.facebook.com/treesnapapp/" className="nav-item">
                                    <span className="icon">
                                        <i className="fa fa-facebook"></i>
                                    </span>
                                </a>
                                <a href="https://twitter.com/Treesnapapp" className="nav-item">
                                    <span className="icon">
                                        <i className="fa fa-twitter"></i>
                                    </span>
                                </a>
                            </div>

                            <span className="nav-toggle">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>

                            <div className="nav-right nav-menu">
                                <a href="/" className="nav-item active">
                                    Home
                                </a>

                                <a href="/map" className="nav-item">
                                    Map
                                </a>

                                <a href="/register" className="nav-item">
                                    Register
                                </a>

                                <a href="/login" className="nav-item">
                                    Login
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div className="container is-small">
                        <div className="home-inner">
                            <div className="columns">
                                <div className="column">
                                    <div className="home-text">
                                        <h3 className="title is-4">COMING SOON</h3>
                                        <h1 className="title is-1">Help Our Nation’s Trees!</h1>
                                        <p>
                                            Invasive diseases and pests threaten the health of America’s
                                            forests. Scientists are working to understand what allows some individual trees to survive,
                                            but they need to find healthy, resilient trees in the forest to study. That’s where
                                            concerned foresters, landowners, and citizens (you!) can help. Tag trees you find in your
                                            community, on your property, or out in the wild to help us understand Forest health!
                                            The Treesnap app is a means for participants to record the location and health of particular
                                            tree species of interest. Scientists use the collected information to locate candidates for
                                            genetic sequencing and breeding programs. To learn more about the Treesnap project, visit
                                            our website.
                                        </p>
                                    </div>
                                </div>
                                <div className="column is-3 has-text-right mock-container is-hidden-mobile">
                                    <img src="/images/mock.png" alt="Mock Device"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container is-small">
                    <div className="home-section">
                        <div className="columns">
                            <div className="column is-6 is-offset-3">
                                <h4 className="title is-4 has-text-centered">Get a notification once TreeSnap gets released</h4>
                                <div className="field has-addons">
                                    <p className="control">
                                        <input className="input" type="text" placeholder="Email"/>
                                    </p>
                                    <p className="control">
                                        <button type="submit" className="button is-primary">
                                            Get Notified!
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Welcome/>, document.getElementById('welcome'))