import React, {Component} from 'react'
import User from '../helpers/User'

export default class HomeFooter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="home-footer">
        <div className="container">
          <div className="columns has-text-centered">
            <div className="column is-4">
              <p><b>Site Map</b></p>
              <ul>
                <li><a href="/map">Observations Map</a></li>
                {User.authenticated() ? <li><a href="/account">Your Account</a></li> : null}
                {!User.authenticated() ? <li><a href="/register">Registration</a></li> : null}
                {!User.authenticated() ? <li><a href="/login">Login</a></li> : null}
                <li><a href="/developer">Developer</a></li>
              </ul>
            </div>
            <div className="column is-4">
              <p><b>Resources</b></p>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/partners">Scientific Partners</a></li>
                <li><a href="/trees">The Trees of TreeSnap</a></li>
                <li><a href="/faq">Frequently Asked Questions</a></li>
              </ul>
            </div>
            <div className="column is-4">
              <p className={'mb-1'}><b>Legal</b></p>
              <ul>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms-of-use">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
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

          <p className={'has-text-centered'}>
            Copyright &copy; {new Date().getFullYear()} University of Tennessee Knoxville and University of Kentucky.
          </p>
        </div>
      </div>
    )
  }
}
