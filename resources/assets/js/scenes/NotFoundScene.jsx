import React, {Component} from 'react'

export default class NotFoundScene extends Component {
  constructor(props) {
    super(props)

    document.title = '404 - Not Found | TreeSnap'
  }

  render() {
    return (
      <div className="error-page">
        <div className="error-page-container has-text-centered">
          <div className="circle">
            404
          </div>
          <h1 className="title is-1">Page Not Found</h1>
          <p className="mb-1">
            Oops! The page you are looking for does not exists.
          </p>
          <div className="buttons-group mt-3">
            <a href="/" className="button">Home</a>
            <a href="/map" className="button">Submissions Map</a>
            <a href="/contact" className="button">Contact Us</a>
          </div>
        </div>
      </div>
    )
  }
}