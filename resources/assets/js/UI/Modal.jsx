import React, {Component, PropTypes} from 'react'

export default class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    componentDidMount() {
        if (this.props.show) {
            this.open()
        }
    }

    close() {
        this.setState({open: false})
    }

    open() {
        this.setState({open: true})
    }

    render() {
        return (
            <div className={`modal${this.state.open ? ' is-active' : ''}`}>
                <div className="modal-background" onClick={this.close.bind(this)}></div>
                <div className="modal-content image-slider" style={{width: '100%', maxWidth: '700px', maxHeight: 'auto'}}>
                    {this.props.children}
                </div>
                <button className="modal-close" onClick={this.close.bind(this)}></button>
            </div>
        )
    }
}

Modal.PropTypes = {
    show: PropTypes.bool
}

Modal.defaultProps = {
    show: false
}
