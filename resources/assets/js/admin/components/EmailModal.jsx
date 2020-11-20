import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Spinner from '../../components/Spinner'
import RichTextEditor from 'react-rte'

export default class EmailModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subject    : '',
      cc         : '',
      message    : '',
      rmessage   : RichTextEditor.createEmptyValue(),
      visible    : false,
      to         : {
        user_id: 0,
        name   : ''
      },
      recipient  : '',
      from       : '',
      observation: {},
      includeInfo: 1,
      loading    : false,
      sent       : false,
      errors     : {
        recipient: [],
        from     : [],
        cc       : [],
        subject  : [],
        message  : []
      }
    }
  }

  componentWillMount() {
    this.setState({
      visible    : this.props.visible,
      to         : this.props.contact.to,
      from       : this.props.contact.from,
      observation: this.props.observation,
      recipient  : this.props.contact.to.name
    })
  }

  componentWillReceiveProps(props) {
    if (props.contact.to.user_id !== this.state.to.user_id || props.observation.id !== this.state.observation.id) {
      this.setState({
        to         : props.contact.to,
        from       : props.contact.from,
        observation: props.observation,
        recipient  : props.contact.to.name
      })
    }

    if (props.visible !== this.state.visible) {
      this.setState({visible: props.visible})
    }
  }

  close() {
    // Reset State
    this.setState({
      subject    : '',
      cc         : '',
      message    : '',
      to         : {
        user_id: 0,
        name   : ''
      },
      recipient  : '',
      from       : '',
      observation: {},
      includeInfo: 0,
      loading    : false,
      sent       : false,
      errors     : {
        recipient: [],
        from     : [],
        cc       : [],
        subject  : [],
        message  : []
      }
    })

    this.props.onCloseRequest()
  }

  send(event) {
    event.preventDefault()
    this.setState({loading: true})
    axios.post('/admin/web/contact/user', {
      recipient          : this.state.to.user_id,
      from               : this.state.from,
      observation_id     : this.state.observation.observation_id,
      cc                 : this.state.cc,
      subject            : this.state.subject,
      message            : this.state.rmessage.toString('markdown'),
      include_observation: this.state.includeInfo ? 1 : 0
    }).then(response => {
      this.setState({
        loading: false,
        sent   : true
      })
    }).catch(error => {
      this.setState({loading: false})
      let response = error.response
      if (response && response.status === 422) {
        let errors = response.data
        this.setState({
          errors: {
            recipient: errors.recipient || [],
            from     : errors.from || [],
            cc       : errors.cc || [],
            subject  : errors.subject || [],
            message  : errors.message || []
          }
        })
      }
    })
  }

  renderFormColumn() {
    if (this.state.sent) {
      return
    }

    return (
      <div className="column">
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label">From</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input type="email"
                       className={`input${this.state.errors.from.length > 0 ? ' is-danger' : ''}`}
                       value={this.state.from}
                       onChange={({target}) => {
                         this.setState({from: target.value})
                       }}/>
              </div>
              {this.state.errors.from.map((error, index) => {
                return (<p className="help is-danger" key={index}>{error}</p>)
              })}
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label">To</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control"
                   style={{backgroundColor: 'whitesmoke', padding: '.5rem', BorderRadius: '2px'}}>
                {this.state.to.name}
              </div>
              {this.state.errors.recipient.map((error, index) => {
                return (<p className="help is-danger" key={index}>{error}</p>)
              })}
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label">CC/BCC</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input type="text"
                       className={`input${this.state.errors.cc.length > 0 ? ' is-danger' : ''}`}
                       placeholder="Comma separated email addresses"
                       value={this.state.cc}
                       onChange={({target}) => {
                         this.setState({cc: target.value})
                       }}/>
                {this.state.errors.cc.map((error, index) => {
                  return (<p className="help is-danger" key={index}>{error}</p>)
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label">Subject</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input type="text"
                       className={`input${this.state.errors.subject.length > 0 ? ' is-danger' : ''}`}
                       placeholder="Subject"
                       value={this.state.subject}
                       onChange={({target}) => {
                         this.setState({subject: target.value})
                       }}/>
              </div>
              {this.state.errors.subject.map((error, index) => {
                return (<p className="help is-danger" key={index}>{error}</p>)
              })}
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label"></div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox"
                         className="mr-0"
                         value={1}
                         checked={this.state.includeInfo}
                         onChange={({target}) => this.setState({includeInfo: target.checked})}/> Include information about this observation?
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label">Message</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control is-expanded">
                <RichTextEditor
                  value={this.state.rmessage}
                  onChange={(rmessage) => this.setState({rmessage})}/>
              </div>
              {this.state.errors.message.map((error, index) => {
                return (<p className="help is-danger" key={index}>{error}</p>)
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  ___tmpSaveTextArea() {
    return (
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Message</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded">
                                <textarea className={`textarea${this.state.errors.message.length > 0 ? ' is-danger' : ''}`}
                                          placeholder="Message"
                                          onChange={({target}) => this.setState({message: target.value})}>
                                </textarea>
            </div>
            {this.state.errors.message.map((error, index) => {
              return (<p className="help is-danger" key={index}>{error}</p>)
            })}
            <p className="help">
              You may use <a href="https://daringfireball.net/projects/markdown/syntax">
              Markdown</a> syntax to style your email.
            </p>
          </div>
        </div>
      </div>
    )
  }

  renderPreviewColumn() {
    if (this.state.sent) {
      return
    }

    let observation = this.state.observation
    if (observation.observation_category === undefined) {
      return
    }

    let address = observation.location.address
    return (
      <div className="column" style={{backgroundColor: 'whitesmoke'}}>
        <h5 className="title is-5">Message Preview</h5>
        <div className="p-1" style={{backgroundColor: '#fff'}}>
          {this.state.subject.trim() !== '' ? <h2 className="title is-5">{this.state.subject}</h2> : null}
          {this.renderPreview()}
          {this.state.includeInfo ? <table className="table">
            <tbody>
            <tr>
              <th>Category</th>
              <td>
                {observation.observation_category}
                {observation.observation_category === 'Other' ? ` (${observation.meta_data.otherLabel})` : null}
              </td>
            </tr>
            {address !== null ?
              <tr>
                <th>Found Near</th>
                <td>{address.formatted}</td>
              </tr>
              : null}
            <tr>
              <th>Date Collected</th>
              <td>{moment(observation.date).format('LL')}</td>
            </tr>
            <tr>
              <th colSpan={2}>
                <a href={`/observation/${observation.observation_id}`}
                   target="_blank">View full details of observation</a>
              </th>
            </tr>
            </tbody>
          </table> : null}
        </div>
      </div>
    )
  }

  renderPreview() {
    let message = this.state.rmessage.toString('html')
    if (message.trim() === '' && !this.state.includeInfo && this.state.subject.trim() === '') {
      return (<p className="text-muted">Preview will be displayed here</p>)
    }

    return (<div className="content" dangerouslySetInnerHTML={{__html: message}}></div>)
  }

  renderSentColumn() {
    if (!this.state.sent) {
      return
    }

    return (
      <div className="column">
        <div className="notification is-success">
          Your message has been sent successfully. If the submitter responds to your email, the message will
          be redirected to your mailbox automatically.
        </div>
      </div>
    )
  }

  render() {
    let contact = this.state.to
    return (
      <div className={`modal${this.state.visible ? ' is-active' : ''}`}>
        <div className="modal-background" onClick={this.close.bind(this)}></div>
        <div className="modal-card modal-card-lg">
          <Spinner visible={this.state.loading}/>
          <header className="modal-card-head">
            <p className="modal-card-title">Contact {contact.name}</p>
            <button type="button" className="delete" onClick={this.close.bind(this)}></button>
          </header>
          <section className="modal-card-body">
            <div className="columns">
              {this.renderFormColumn()}
              {this.renderPreviewColumn()}
              {this.renderSentColumn()}
            </div>
          </section>
          <footer className="modal-card-foot">
            {!this.state.sent ?
              <div className="flexbox flex-space-between">
                <button type="button"
                        className="button is-success"
                        onClick={this.send.bind(this)}>
                  Send
                </button>
                <button type="button"
                        className="button"
                        onClick={this.close.bind(this)}>
                  Cancel
                </button>
              </div>
              :
              <button type="button"
                      className="button is-success"
                      onClick={this.close.bind(this)}>
                Done
              </button>
            }

          </footer>
        </div>
      </div>
    )
  }
}

EmailModal.propTypes = {
  contact       : PropTypes.object.isRequired,
  onCloseRequest: PropTypes.func.isRequired,
  observation   : PropTypes.object.isRequired,
  visible       : PropTypes.bool
}

EmailModal.defaultProps = {
  visible: false
}
