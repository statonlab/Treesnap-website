import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Spinner extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * Render Spinner.
   *
   * @returns {*}
   */
  render() {
    if (!this.props.visible) {
      return null
    }

    // Render the inline spinner
    if (this.props.inline) {
      return (
        <div className="mt-1" style={this.props.containerStyle}>
          <i className="fa fa-refresh fa-spin fa-2x"></i>
        </div>
      )
    }

    // Render a full page spinner
    return (
      <div className="spinner-overlay"
           style={this.props.containerStyle}>
        <div className="overlay-blur"></div>
        <span className="spinner-container">
          <i className="is-loading"></i>
        </span>
      </div>
    )
  }
}

Spinner.propTypes = {
  visible       : PropTypes.bool.isRequired,
  containerStyle: PropTypes.object,
  inline        : PropTypes.bool
}

Spinner.defaultProps = {
  containerStyle: {},
  inline        : false
}
