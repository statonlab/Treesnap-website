import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Disclaimer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      shown  : false
    }

    this.storageID  = `disclaimer_last_show_${this.props.id}`
    this.shouldShow = this.determineShouldShow()
  }

  determineShouldShow() {
    if (!window.localStorage) {
      // This browser doesn't support local storage :'(
      return true
    }


    let last_shown = window.localStorage.getItem(this.storageID)

    if (last_shown) {
      if (moment().subtract(7, 'days').isAfter(last_shown)) {
        window.localStorage.removeItem(this.storageID)
        return true
      }

      return false
    }

    return true
  }

  close() {
    this.setState({visible: false})
  }

  dontShowAgain() {
    this.close()

    if (window.localStorage) {
      window.localStorage.setItem(this.storageID, moment())
    }
  }

  show() {
    if (this.state.shown || !this.shouldShow) {
      return
    }

    this.setState({visible: true, shown: true})
  }

  render() {
    return (
      <div className={`notification is-info floating-disclaimer${this.state.visible ? ' is-active' : ''}`}
           onClick={(e) => e.stopPropagation()}>
        <button className="delete" type="button" onClick={this.close.bind(this)}></button>
        {this.props.children}

        <div className={'mt-0'}>
          <button className="button is-info is-inverted is-small"
                  onClick={this.dontShowAgain.bind(this)}>
            Don't show me this again
          </button>
        </div>
      </div>
    )
  }
}

Disclaimer.propTypes = {
  id: PropTypes.number
}

Disclaimer.defaultProps = {
  id: 0
}
