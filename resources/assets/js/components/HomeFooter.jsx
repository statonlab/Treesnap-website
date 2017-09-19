import React, {Component} from 'react'

export default class HomeFooter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isHome: false
    }
  }

  componentWillMount() {
    this.setState({
      isHome: window.location.pathname === '/'
    })
  }

  render() {
    return (
      <div className="home-footer">
        <div className="container">
          <p className="mb-1">
            Copyright &copy; 2017 University of Tennessee Knoxville and University of Kentucky.
          </p>

          <p>
            <a href="/privacy-policy">Privacy Policy and Terms of Use</a>
          </p>
          {this.state.isHome ?
            <p>
              Icons by <a href="http://www.flaticon.com/authors/vectors-market"> Vectors Market</a>
            </p>
            : null}
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
        </div>
      </div>
    )
  }
}