import React, {Component} from 'react'
import PropTypes from 'prop-types'
export default class Modal extends Component {
  close() {
    if (!this.props.permanent) {
      this.props.onCloseRequest()
    }
  }

  render() {
    return (
      <div className="modal is-active">
        {this.props.permanent || !this.props.showClose ? null :
          <button className="close-modal" onClick={this.close.bind(this)} style={{zIndex: 999999}}>
            <i className="fa fa-times"></i>
          </button>
        }
        <div className="modal-background" onClick={this.close.bind(this)}></div>
        {!this.props.card ?
          <div className="modal-content image-slider" style={{width: '100%', maxWidth: '700px'}}>
            {this.props.children}
          </div>
          : this.props.children}
      </div>
    )
  }
}

Modal.propTypes = {
  onCloseRequest: PropTypes.func.isRequired,
  permanent     : PropTypes.bool,
  showClose     : PropTypes.bool,
  card          : PropTypes.bool
}

Modal.defaultProps = {
  permanent: false,
  showClose: true,
  card     : false
}
