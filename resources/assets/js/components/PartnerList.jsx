import React, {Component} from 'react'

export default class PartnerList extends Component {
  constructor(props) {
    super(props)

    document.title = 'Our Partners | TreeSnap'
  }

  render() {
    return (
      <div className="home-section">
        <h1 className="title is-3">Our Partners</h1>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.nrs.fs.fed.us/units/invasivescontrol/">
                <img src="/images/FS_green.png" alt="US forest service" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">USDA Forest Service Northern Research Station</p>
              <p className="feature-text">
                The USDA Forest Service Northern Research Station's mission is to
                provide basic and applied knowledge about, and develop methods for, protecting
                and sustaining landscapes disturbed by invasive species and other agents.
                As a TreeSnap partner, they will use data on ash and elm to find trees
                that are resistant to the emerald ash borer and Dutch elm disease. They plan
                to use data from areas where these threats have been established for some
                time to identify “lingering” trees that survive long past others have died to
                be used in research and breeding programs.
              </p>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://threatenedforests.com/">
              <img src="/images/flat-icons/teamwork-3.png"
                   alt="Man Icon"
                   className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">Forest Restoration Alliance</p>
              <p className="feature-text">
                The Forest Restoration Alliance works to restore healthy forests and
                landscapes in eastern America by researching and addressing invasive pest
                threats to hemlock, firs, and other native trees.
              </p>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href ="http://savehemlocksnc.org/">
              <img src="/images/HRI.png"
                   alt="Man Icon"
                   className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">Hemlock Restoration Initiative</p>
              <p className="feature-text">
                The Hemlock Restoration Initiative aims to restore eastern and Carolina
                hemlocks to their native habitats throughout North Carolina and to mitigate
                damage to hemlocks caused by infestation of the hemlock woolly adelgid. They
                will use data on hemlock to find trees that are resistant to hemlock woolly
                adelgid.
              </p>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href ="https://www.acf.org/">
              <img src="/images/ACF_logo.png" alt="American Chestnut Foundation"
                   className="feature-icon"
              />
              </a>
            </div>
            <div className="media-content">
              <p className="title">American Chestnut Foundation
              </p>
              <p className="feature-text">
                The American Chestnut Foundation seeks to return the American chestnut to
                its native range.
                The American Chestnut Foundation will use data on chestnuts to find trees
                that are resistant to chestnut blight to be added to breeding and research
                programs.
              </p>
            </div>
          </div>
        </div>
        <div className="box">

          <div className="media">
            <div className="media-left">
            <a href ="http://www.foresthealthcenter.org">
              <img src="/images/FHC_small.png"
                   alt="Man Icon"
                   className="feature-icon"/>
            </a>
            </div>
            <div className="media-content">
              <p className="title">Forest Health Research and Education Center
              </p>
              <p className="feature-text">
                The Forest Health Research and Education Center's mission is to advance the
                conservation of forested ecosystems by integrating genetics-based biological
                research with social science research and education and outreach on factors
                affecting tree health and forest restoration.
                The Forest Health Research and Education Center will use data on white oak
                to build a breeding program. Their goal is to be better prepared in the
                event that any invasive pests that target white oak are introduced in the
                future.
              </p>
            </div>
          </div>
        </div>
        <div className="box">

          <div className="media">
            <div className="media-left">
              <img src="/images/flat-icons/teamwork-3.png"
                   alt="Man Icon"
                   className="feature-icon"/>
            </div>
            <div className="media-content">
              <p className="title">Your Organization?</p>
              <p className="feature-text">
                Have a project or tree breeding program you want involved? Let us know! You
                can visit our contact page, or find us on Facebook or Twitter.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}