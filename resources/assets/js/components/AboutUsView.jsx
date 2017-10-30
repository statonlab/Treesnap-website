import React, {Component} from 'react'

export default class AboutUsView extends Component {
    render() {
        return (
            <div>
                <div className="box">
                    <h3> The TreeSnap Project</h3>
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

                <div className="box">
                    <h3> The TreeSnap Team</h3>

                    <p>
                        TreeSnap was developed as a collaboration between Scientists at the University of Kentucky and
                        the University of Tennessee. The project is funded in part by the <a
                        href="https://nsf.gov/funding/pgm_summ.jsp?pims_id=5338">NSF Plant Genome Research Program</a>.
                        To learn more about the Staton laboratory and the genomic resources we provide, please visit the
                        <a href="http://www.hardwoodgenomics.org/"> Hardwoods Genomics Database</a>.
                    </p>
                </div>
                <p className="title is-4">Development Team</p>

                <div className="tile is-ancestor">

                    <div className="tile is-parent">

                        <div className="tile is-child card us-tile">
                            <div className="card-image">
                                <figure className="image face">
                                    <img src="/images/us/mstaton.jpg"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div classname="media-content">
                                        <p className="title is-4">Margaret Staton</p>
                                        <p className="subtitle is-6">Principle Investigator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tile is-parent">
                        <div className="tile is-child card us-tile">
                            <div className="card-image">
                                <figure className="image">
                                    <img src="/images/us/condon.jpg"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div classname="media-content">
                                        <p className="title is-4">Bradford Condon</p>
                                        <p className="subtitle is-6">Mobile and Web Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="tile is-parent">

                        <div className="tile is-child card us-tile">
                            <div className="card-image">
                                <figure className="image">
                                    <img src="/images/us/almsaeed.jpg"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div classname="media-content">
                                        <p className="title is-4">Abdullah Almsaeed</p>
                                        <p className="subtitle is-6">Mobile and Web Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="title is-4">Extension and Genetics Team</p>

                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <div className="tile is-child card us-tile">
                            <div className="card-image">
                                <figure className="image is-square">
                                    <img src="/images/us/nelson.jpg"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div classname="media-content">
                                        <p className="title is-4">Dana Nelson</p>
                                        <p className="subtitle is-6">Principal Investigator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tile is-parent">
                        <div className="tile is-child card us-tile">
                            <div className="card-image">
                                <figure className="image is-square">
                                    <img src="/images/us/abbott.jpg"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div classname="media-content">
                                        <p className="title is-4">Bert Abbott</p>
                                        <p className="subtitle is-6">Principal Investigator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <div className="tile is-child card us-tile">
                            <div className="card-image">
                                <figure className="image is-square">
                                    <img src="/images/us/crocker.jpg"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div classname="media-content">
                                        <p className="title is-4">Ellen Crocker</p>
                                        <p className="subtitle is-6">Extension and Outreach Specialist</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-image">
                        <figure ClassName="image">
                <img src="/images/us/FHREC_photo.jpg"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div classname="media-content">
                                <p className="subtitle is-6">The Forest Health Research and Education Center retreat 2017</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}