import React, {Component} from 'react'

export default class HomeFooter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="home-footer">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="column ">
                <p>Site Map</p>
              </div>
            </div>
          </div>
          <p>
            <a href="/privacy-policy">Privacy Policy and Terms of Use</a>
          </p>
          <div className="columns logos">
            <div className="column has-text-centered">
              <a href="https://www.utk.edu/">
                <img src="/images/ut3.png" alt="University of Tennessee Logo"/>
              </a>
            </div>
            <div className="column has-text-centered">
              <a href="https://uky.edu">
                <img src="/images/uky3.png" alt="University of Kentucky Logo"/>
              </a>
            </div>
            <div className="column has-text-centered">
              <a href="https://www.nsf.gov/">
                <img src="/images/nsf1.png" alt="NSF Logo"/>
              </a>
            </div>
          </div>

          <p>
            Copyright &copy; {new Date().getFullYear()} University of Tennessee Knoxville and University of Kentucky.
          </p>
        </div>
      </div>
    )
  }
}
