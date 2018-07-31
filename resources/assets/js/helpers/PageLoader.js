import React from 'react'

export default function PageLoader(props) {
  if (props.error !== null) {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <div className="alert is-danger mt-3">
              An error occurred while loading. Please try again by refreshing the page.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="spinner-overlay">
      <div className="overlay-blur"></div>
      <span className="spinner-container">
        <i className="is-loading"></i>
      </span>
    </div>
  )
}
