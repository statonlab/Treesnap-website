import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Notify extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show     : false,
      hiding   : false,
      marginTop: window.scrollY > 70 ? -40 : 0
    }
  }

  componentWillMount() {
    this.timer = setTimeout(() => {
      this.hide()
    }, 5000)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({show: true})
    }, 100)

    window.addEventListener('scroll', this.handleWindowScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll.bind(this))
  }

  handleWindowScroll() {
    let marginTop = window.scrollY > 70 ? -40 : 0
    this.setState({marginTop})
  }

  hide() {
    this.setState({hiding: true})
    clearTimeout(this.timer)
  }

  render() {
    let classes = ''

    switch (this.props.type) {
      case 'success':
      case 'danger':
      case 'info':
      case 'warning':
        classes = `is-${this.props.type}`
        break
      default:
        classes = 'is-success'
    }

    classes += this.state.show ? ' show' : ''
    classes += this.state.hiding ? ' hiding' : ''

    let marginTop = this.state.marginTop

    return (
      <div className={`notification push-notification ${classes}`} style={{marginTop: marginTop + 'px'}}>
        <button type="button" className="delete" onClick={this.hide.bind(this)}></button>
        {this.props.message}
      </div>
    )
  }

  static _remove() {
    if (this.stack && this.stack.length > 0) {
      document.body.removeChild(this.stack.shift())
    }
  }

  static push(message, type = 'success') {
    let container = document.createElement('div')

    ReactDOM.render(React.createElement(
      Notify,
      {message, type, container}
    ), container)

    document.body.appendChild(container)

    if (this.stack.length > 0) {
      this._remove()
    }

    this.stack.push(container)
  }
}

Notify.PropTypes = {
  message  : PropTypes.string.isRequired,
  type     : PropTypes.string,
  container: PropTypes.object.isRequired
}

Notify.defaultProps = {
  type: 'success'
}

Notify.stack = []