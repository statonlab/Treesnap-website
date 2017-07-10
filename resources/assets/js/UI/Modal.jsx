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
                <button className="close-modal" onClick={this.close.bind(this)} style={{zIndex: 999999}}>
                    <i className="fa fa-times"></i>
                </button>
                <div className="modal-background" onClick={this.close.bind(this)}></div>
                <div className="modal-content image-slider" style={{width: '100%', maxWidth: '700px'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Modal.PropTypes = {
    show: PropTypes.bool.isRequired
}

Modal.defaultProps = {
    show: false
}
