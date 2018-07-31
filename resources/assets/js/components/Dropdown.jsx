import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }

  show() {
    this.setState({show: true})
  }

  hide() {
    setTimeout(() => {
      this.setState({show: false})
    }, 100)
  }

  toggle() {
    if (this.state.show) {
      this.hide()
      return
    }

    this.show()
  }

  render() {
    return (
      <div className={`dropdown${this.state.show ? ' is-active' : ''}${this.props.right ? ' is-right' : ''} has-text-left`}
           style={{width: this.props.isBlock ? '100%' : undefined}}>
        <div className="dropdown-trigger"
             style={{width: this.props.isBlock ? '100%' : undefined}}
             onClick={this.toggle.bind(this)} onBlur={this.hide.bind(this)}>
          {this.props.trigger}
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  trigger: PropTypes.object.isRequired,
  right  : PropTypes.bool,
  isBlock: PropTypes.bool
}

Dropdown.defaultProps = {
  right  : false,
  isBlock: false
}
