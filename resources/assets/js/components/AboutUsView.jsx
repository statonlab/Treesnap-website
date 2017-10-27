import React, {Component} from 'react'

export default class AboutUsView extends Component {
    render() {
        return (
            <div className="home-section">
                <div className="box">
                    <h3 className="title is-4">The TreeSnap Project</h3>
                    <p>
                        Help our nation’s trees! Invasive diseases and pests threaten the health of America’s forests.
                        Scientists are working to understand what allows some individual trees to survive, but they need
                        to find healthy, resilient trees in the forest to study. That’s where concerned foresters,
                        landowners, and citizens (you!) can help. Tag trees you find in your community, on your
                        property, or out in the wild using TreeSnap!
                        Scientists will use the data you collect to locate trees for research projects like studying
                        genetic diversity of tree species and building better tree breeding programs.
                    </p>
                </div>
            </div>
        )
    }
}