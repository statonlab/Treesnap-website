import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ObservationDetails from './ObservationDetails'

export default class ObservationDetailsModal extends Component {
  constructor(props) {
    super(props)
  }

  close() {
    this.props.onCloseRequest()
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={`modal${this.props.visible ? ' is-active' : ''}`}>
        <div className="modal-background" onClick={this.close.bind(this)}></div>
        <div className="modal-content modal-card-lg">
          <ObservationDetails observation={this.props.observation}/>
        </div>
        <button className="modal-close" onClick={this.close.bind(this)}></button>
      </div>
    )
  }
}

ObservationDetailsModal.PropTypes = {
  visible       : PropTypes.bool.isRequired,
  onCloseRequest: PropTypes.func.isRequired,
  observation   : PropTypes.object.isRequired
}
