import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class BoxModal extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className={`modal is-active`}>
        <div className="modal-background" onClick={this.props.onCloseRequest}></div>
        {this.props.showCloseButton ?
          <button className="close-modal" onClick={this.props.onCloseRequest} style={{zIndex: 999999}}>
            <i className="fa fa-times"></i>
          </button> : null}
        <div className="modal-content">
          <div className="box">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

BoxModal.PropTypes = {
  visible        : PropTypes.bool.isRequired,
  onCloseRequest : PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool
}

BoxModal.defaultProps = {
  showCloseButton: true
}
