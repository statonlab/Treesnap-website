import React, {Component, PropTypes} from 'react'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="app-footer">
        <div>
          Download <strong>TreeSnap</strong> from the <a href="#">App Store</a> or <a href="#">Google Play</a>
        </div>
      </div>
    )
  }
}

Footer.PropTypes = {}