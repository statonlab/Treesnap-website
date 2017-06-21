import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Notify extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show  : false,
            hiding: false
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
    }

    static _remove() {
        document.body.removeChild(this.stack[0])
        this.stack.shift()
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

        return (
            <div className={`notification push-notification ${classes}`}>
                <button type="button" className="delete" onClick={this.hide.bind(this)}></button>
                {this.props.message}
            </div>
        )
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