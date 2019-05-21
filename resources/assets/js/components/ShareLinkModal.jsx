import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ShareLinkModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shareLocation : 'not exact',
      shareLink     : '',
      shareLinkExact: ''
    }
  }

  close() {
    this.props.onCloseRequest()
  }

  componentDidMount() {
    const id = this.props.observationID

    this.setState({shareLink: `https://treesnap.org/observation/${id}`})
    this.makeExactShareLink()
  }

  render() {
    return (
      <div className={`modal${this.props.visible ? ' is-active' : ''}`}>
        <div className="modal-background" onClick={this.close.bind(this)}/>
        <div className="modal-content modal-card-lg">
          <header className="modal-card-head">
            <p className="modal-card-title">Shareable Link</p>
          </header>
          <section className="modal-card-body" id="filters-card-body">
            <div className="select">
              <select
                onChange={(e) => this.setState({shareLocation: e.target.value})}
                defaultValue="not exact">
                <option value="not exact">Share without exact location</option>
                <option value="exact"> Share with exact location</option>
              </select>
            </div>
            <p className="modal-card-body">
              {this.state.shareLocation === 'exact' ?
                'People with this link will be able to see the exact location of your observation.' :
                'People with this link will not be able to see the exact location of your observation.'}
            </p>
            <input type="text"
                   readOnly={true}
                   className="input"
                   value={this.state.shareLocation === 'exact' ?
                     this.state.shareLinkExact : this.state.shareLink}
            />
          </section>
        </div>
        <button className="modal-close" onClick={this.close.bind(this)}/>
      </div>
    )
  }

  getShareLink() {
    if (this.state.shareLocation === 'exact') {
      if (!this.state.shareLinkExact) {
        this.setState({shareLinkExact: this.makeExactShareLink()})
      }
      return this.state.shareLinkExact
    }
    return this.state.shareLink
  }

  makeExactShareLink() {
    const id = this.props.observationID

    axios.get(`/web/share/observation/${id}`).then(response => {
      const data = response.data.data
      this.setState({
        shareLinkExact: data
      })
    }).catch(error => {
      console.log(error)
      let response = error.response
      if (response && response.status === 500) {
        alert('Network Error. Please contact us to resolve this issue.')
      }
    })
  }
}

ShareLinkModal.propTypes = {
  visible       : PropTypes.bool.isRequired,
  onCloseRequest: PropTypes.func.isRequired
}
