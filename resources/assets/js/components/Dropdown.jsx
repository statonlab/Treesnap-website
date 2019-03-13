import React, { Component } from 'react'
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
    }, this.props.timeout)
  }

  toggle() {
    if (this.state.show) {
      this.hide()
      return
    }

    this.show()
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutClick.bind(this))
  }

  componentWillUnmount() {
    document.addEventListener('click', this.handleOutClick.bind(this))
  }

  handleOutClick(event) {
    let target = event.target

    if (!this.state.show) {
      return
    }

    if (!this.refs.menu) {
      return
    }

    if (target !== this.refs.menu && !this.refs.menu.contains(target)) {
      this.hide()
    }
  }

  render() {
    return (
      <div ref="menu"
           className={`dropdown${this.state.show ? ' is-active' : ''}${this.props.right ? ' is-right' : ''} has-text-left`}
           style={{width: this.props.isBlock ? '100%' : undefined}}>
        <div className="dropdown-trigger"
             style={{width: this.props.isBlock ? '100%' : undefined}}
             onClick={this.toggle.bind(this)}>
          {this.props.trigger}
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {this.props.children.map((child, k) => {
              return React.cloneElement(child, {
                key: k,
                onClick: () => {
                  setTimeout(this.hide.bind(this), this.props.timeout)
                }
              })
            })}
          </div>
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  trigger: PropTypes.object.isRequired,
  right  : PropTypes.bool,
  isBlock: PropTypes.bool,
  timeout: PropTypes.number
}

Dropdown.defaultProps = {
  right  : false,
  isBlock: false,
  timeout: 110
}
