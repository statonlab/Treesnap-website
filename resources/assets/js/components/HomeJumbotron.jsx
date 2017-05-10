import React, {Component} from 'react'

export default class HomeJumbotron extends Component {
    render() {
        return (
            <div className="container">
                <div className="home-inner">
                    <div className="columns">
                        <div className="column">
                            <div className="home-text">
                                <h3 className="title is-4 mb-none">COMING SOON</h3>
                                <h1 className="title is-1">Help Our Nation’s Trees!</h1>
                                <p>
                                    Invasive diseases and pests threaten the health of America’s forests. Scientists are
                                    working to understand what allows some individual trees to survive, but they need to
                                    find healthy, resilient trees in the forest to study. That’s where concerned
                                    foresters, landowners, and citizens (you!) can help. Tag trees you find in your
                                    community, on your property, or out in the wild using Treesnap to help us
                                    understand Forest health! Scientists use the collected information to locate
                                    candidates for genetic sequencing and breeding programs. The location, photos, and
                                    data for submitted trees is made available on our submission map.
                                    Treesnap is currently in closed beta.
                                </p>
                            </div>
                        </div>
                        <div className="column is-3 has-text-right mock-container is-hidden-mobile">
                            <img src="/images/mock.png" alt="Mock Device" className="mockup-img"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}