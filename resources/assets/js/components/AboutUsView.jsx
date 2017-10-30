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
                    <img src="/images/us/FHREC_photo.jpg"/>
                    <p>Forest Health Research and Education Center 2017 retreat</p>
                </div>

                <h3> The TreeSnap Team</h3>
                <div className="box">
                    <p>
                        TreeSnap was developed as a collaboration between Scientists at the University of Kentucky and
                        the University of Tennessee. The project is funded in part by the <a
                        href="https://nsf.gov/funding/pgm_summ.jsp?pims_id=5338">NSF Plant Genome Research Program</a>.
                        To learn more about the Staton laboratory and the genomic resources we provide, please visit the
                        <a href="http://www.hardwoodgenomics.org/"> Hardwoods Genomics Database</a>.
                    </p>
                </div>
                <div className="tile is-ancestor is-vertical">
                    <div className="tile is-parent">
                        <article className="tile card is-child us-tile">
                            <div className="card-image">
                                <figure className="image is-1by1">
                                    <img src="/images/us/mstaton.jpg"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <p className="title">Margaret Staton</p>
                                <p className="subtitle">Principle Investigator</p>
                            </div>
                        </article>
                        <article className="tile is-child us-tile">
                            <p className="title">Bradford Condon</p>
                            <p className="subtitle">Web and Mobile Developer</p>
                            <figure className="image">
                                <img src="/images/us/condon.jpg"/>
                            </figure>
                        </article>
                        <article className="tile is-child us-tile">
                            <p className="title">Abdullah Almsaeed</p>
                            <p className="subtitle">Web and Mobile Developer</p>
                            <figure className="image">
                                <img src="/images/us/almsaeed.jpg"/>
                            </figure>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child us-tile">
                            <p className="title">Dana Nelson</p>
                            <p className="subtitle">Principle Investigator</p>
                            <figure className="image">
                                <img src="/images/us/Nelson.jpg"/>
                            </figure>
                        </article>
                        <article className="tile is-child us-tile">
                            <p className="title">Bert Abbot</p>
                            <p className="subtitle">Principle Investigator</p>
                            <figure className="image">
                                <img src="/images/us/abbot.jpg"/>
                            </figure>
                        </article>
                        <article className="tile is-child us-tile">
                            <p className="title">Ellen Crocker</p>
                            <p className="subtitle">Extension and Outreach Specalist</p>
                            <figure className="image">
                                <img src="/images/us/crocker.jpg"/>
                            </figure>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}