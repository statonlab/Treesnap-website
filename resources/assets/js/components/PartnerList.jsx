import React, { Component } from 'react'

export default class PartnerList extends Component {
  constructor(props) {
    super(props)

    document.title = 'Our Partners | TreeSnap'
  }

  render() {
    return (
      <div>
        <h1 className="title is-3">Our Partners</h1>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.nrs.fs.usda.gov/disturbance/invasive_species/">
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
              <a className={'button is-info'}
                 href="https://www.nrs.fs.usda.gov/disturbance/invasive_species/">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.fs.usda.gov/detail/r6/landmanagement/resourcemanagement/?cid=stelprdb5279775">
                <img src="/images/FS_green.png" alt="US forest service" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">USDA Forest Service Dorena Genetic Resource Center (DGRC)</p>
              <p className="feature-text">
                DGRC is a regional facility that specializes in working with genetic resistance to
                diseases and insects, as well as gene conservation and genetic variation studies.
                As a TreeSnap partner, they (and cooperators) will use data on ash to find trees that
                are resistant to the emerald ash borer, to learn basic information on the genetic variation
                in the species and to initiate ex situ gene conservation using some of the seed.
              </p>
              <a className={'button is-info'}
                 href="https://www.fs.usda.gov/detail/r6/landmanagement/resourcemanagement/?cid=stelprdb5279775">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.facebook.com/ThreatenedForests">
                <img src="/images/fra.png"
                     alt="Forest Restoration Alliance logo"
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
              <a className={'button is-info'} href="https://www.facebook.com/ThreatenedForests">Visit Full Site</a>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="http://savehemlocksnc.org/">
                <img src="/images/HRI.png"
                     alt="Hemlock restoration initiative logo"
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
              <a className={'button is-info'} href="http://savehemlocksnc.org/">Visit Full Site</a>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.acf.org/">
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
              <a className={'button is-info'} href="https://www.acf.org/">Visit Full Site</a>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="http://www.foresthealthcenter.org">
                <img src="/images/FHC_small.png"
                     alt="Forest Health Center icon"
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
              <a className={'button is-info'} href="http://www.foresthealthcenter.org">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="http://atlantabg.org/">
                <img src="/images/ABG.png"
                     alt="Atlanta Botanical Garden icon"
                     className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">Atlanta Botanical Garden
              </p>
              <p className="feature-text">
                The Atlanta Botanical Garden's mission is to develop and maintain plant collections for display, education, research, conservation and enjoyment. The Garden has launched the Center for Southeastern Conservation, an expansion of the Garden’s conservation research and education. Through conservation of imperiled species and habitats in the Carolinas, Tennessee, Georgia, Florida, Alabama, Mississippi, and Louisiana, the Center protects the natural heritage of one of North America’s most biodiverse regions.
              </p>
              <a className={'button is-info'} href="http://atlantabg.org/">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.fnps.org/">
                <img src="/images/fnps.png"
                     alt="Florida Native Plant Society icon"
                     className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">
                Florida Native Plant Society
              </p>
              <p className="feature-text">
                The Mission of the Florida Native Plant Society is to promote the preservation, conservation, and restoration of the native plants and native plant communities of Florida. The FNPS TorreyaKeepers Project is dedicated to saving the Florida Torreya (Torreya taxifolia) in its native habitat. One of the most endangered conifers in the world, the Florida Torreya has a limited native range in Florida and Georgia and only a few hundred remaining individuals in the wild. Data collected from TreeSnap will be used to find remaining trees and track their health.
              </p>
              <a className={'button is-info'} href="https://www.fnps.org/">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://plantcompgenomics.com">
                <img src="/images/uconn_lab.png"
                     alt="University of Connecticut"
                     className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">UConn Plant Computational Genomics Lab</p>
              <p className="feature-text">
                The computational genomics lab at the University of Connecticut, led by Dr Jill Wegrzyn, focuses on the computational analysis of genomic and transcriptomic sequences from non-model plant species. We do this by developing approaches to examine gene finding, gene expression, transcriptome assembly, and conserved element identification, through machine learning and computational statistics. We use these novel methods to address questions related to genome biology and population genomics.
              </p>
              <p className="feature-text">
                We also develop web-based applications that integrate data across domains to facilitate the forest geneticist or ecologist's ability to analyze, share, and visualize their data. Such integration requires the implementation of semantic technologies and ontologies to connect genotype, phenotype, and environmental data.
              </p>
              <a className={'button is-info'} href="https://plantcompgenomics.com">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://wsu.edu/">
                <img src="/images/wsu-logo.png" alt="Washington State University" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">Washington State University</p>
              <p className="feature-text">
                The Washington State University - Puyallup Ornamental Plant Pathology program conducts
                research relating to diseases of ornamental plants. WSU Extension is collaborating with
                USDA Forest Service and City of Seattle Parks and Recreation to conserve and restore
                Pacific madrone. They will use data to classify madrone tree/forest health and identify
                a true range for the species.
              </p>
              <a className={'button is-info'} href="https://wsu.edu/">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://oregonstate.edu/">
                <img src="/images/osu-logo.png" alt="Oregon State University" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">Oregon State University</p>
              <p className="feature-text">
                The Oregon State University is a land grant institution committed to teaching, research
                and outreach and engagement, Oregon State University promotes economic, social, cultural
                and environmental progress for the people of Oregon, the nation and the world.
              </p>
              <a className={'button is-info'} href="https://oregonstate.edu/">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.oregon.gov/ODF">
                <img src="/images/odf-logo.png" alt="Oregon Department of Forestry" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">Oregon Department of Forestry</p>
              <p className="feature-text">
                Oregon Department of Forestry serves the people of Oregon by protecting, managing, and
                promoting stewardship of Oregon's forests to enhance environmental, economic​, and
                community sustainability.
              </p>
              <a className={'button is-info'} href="https://www.oregon.gov/ODF">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.nature.org/en-us">
                <img src="/images/tnc-logo.jpg" alt="The Nature Conservancy" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">The Nature Conservancy</p>
              <p className="feature-text">
                Our mission is to conserve the lands and waters on which all live depends
              </p>
              <a className={'button is-info'} href="https://www.nature.org/en-us">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.nmsu.edu">
                <img src="/images/nmsu-logo.jpg" alt="New Mexico State University" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">New Mexico State University</p>
              <p className="feature-text">
                The John T. Harrington Forestry Research Center with New Mexico State University is the only research program in the southwestern US that focuses on forest nursery technologies, tree improvement, and eco-physiology of young forest trees to facilitate ecological restoration and/or commercial reforestation. These research interests are critical for establishing future forests in the region.
              </p>
              <a className={'button is-info'} href="https://www.nmsu.edu">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.nmhu.edu">
                <img src="/images/nmhu-logo.jpg" alt="New Mexico Highlands University" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">New Mexico Highlands University</p>
              <p className="feature-text">
                The mission of the New Mexico Highlands University Department of Forestry is to engage in teaching, research, and service in forestry to promote the sustainable management of forest resources. The Forestry teaching program seeks to enhance the competency and excellence of the forestry profession. The undergraduate Forestry degree program is designed to educate well-rounded, technologically proficient, and ecologically aware forest managers, providing them with a background sufficient to enable them to support the continued health, integrity, and use of forests for the benefit of society. Being part of a Hispanic Serving Institution (HSI), the Forestry program seeks to address the needs of underrepresented students in the forestry profession.
              </p>
              <a className={'button is-info'} href="https://www.nmhu.edu">Visit Full Site</a>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <a href="https://www.nature.org/en-us/about-us/where-we-work/united-states/tennessee/stories-in-tennessee/hemlock/">
                <img src="/images/tnc.png" alt="The Nature Conservancy" className="feature-icon"/>
              </a>
            </div>
            <div className="media-content">
              <p className="title">The Nature Conservancy</p>
              <p className="feature-text">
                The John T. Harrington Forestry Research Center with New Mexico State University is the only research program in the southwestern US that focuses on forest nursery technologies, tree improvement, and eco-physiology of young forest trees to facilitate ecological restoration and/or commercial reforestation. These research interests are critical for establishing future forests in the region.
              </p>
              <a className={'button is-info'} href="https://www.nature.org/en-us/about-us/where-we-work/united-states/tennessee/stories-in-tennessee/hemlock/">Visit Full Site</a>
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
