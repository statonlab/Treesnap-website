import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import User from '../helpers/User'

export default class FlagForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reason  : 0,
      comments: '',
      errors  : {
        reason  : [],
        comments: []
      },
      flagged : false,
      flag_id : 0,
      loading : false
    }

    this.reasons = [
      'This tree is the wrong species',
      'This tree is on my private land and I would like it removed',
      'This submission is spam',
      'This submission is inappropriate',
      'Other'
    ]
  }

  componentDidMount() {
    this.setState({
      flagged: this.props.flagged,
      flag_id: this.props.flagId
    })
  }

  componentWillReceiveProps(props) {
    if (props.flagged !== this.state.flagged) {
      this.setState({flagged: props.flagged})
    }
  }

  undo(event) {
    event.preventDefault()

    this.setState({loading: true})
    axios.delete(`/web/flag/${this.state.flag_id}`).then(response => {
      this.setState({loading: false})
      this.props.onUndo(response.data.data)
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  submit(event) {
    event.preventDefault()

    if (!this.validate()) {
      return
    }

    this.setState({loading: true})

    axios.post('/web/flag', {
      observation_id: this.props.observationId,
      reason        : this.state.reason,
      comments      : this.state.comments
    }).then(response => {
      const data = response.data.data
      // Reset Form
      this.setState({
        loading : false,
        reason  : 0,
        comments: '',
        errors  : {
          reason  : [],
          comments: []
        },
        flag_id : data.id
      })

      this.props.onSubmit(data)
    }).catch(error => {
      this.setState({loading: false})

      let response = error.response

      if (response && response.status === 422) {
        let errors = response.data
        this.setState({
          errors: {
            reason  : errors.reason || [],
            comments: errors.comments || []
          }
        })

        return
      }

      console.log(error)
    })
  }

  validate() {
    let errors = {
      reason  : [],
      comments: []
    }
    let error  = false

    if (this.state.reason === 0) {
      errors.reason = ['The reason field is required.']
      error         = true
    }

    if (this.state.reason === 'Other' && this.state.comments.trim() === '') {
      errors.comments = ['Please specify the other reason.']
      error           = true
    }

    this.setState({errors})

    return !error
  }

  renderFlagForm() {
    return (
      <form action="#" method="POST" onSubmit={this.submit.bind(this)}>
        <p className={'mb-0'}>Alert site administrators of an issue with this observation.</p>
        <div className="field">
          <label className="label">Reason</label>
          <div className="control">
            <span className={`select${this.state.errors.reason.length > 0 ? ' is-danger' : ''}`}>
              <select value={this.state.reason}
                      onChange={({target}) => this.setState({reason: target.value})}>
                <option value="0" disabled={true}>[Reason]</option>
                {this.reasons.map((reason, index) => {
                  return (<option value={reason} key={index}>{reason}</option>)
                })}
              </select>
            </span>
            {this.state.errors.reason.map((error, index) => {
              return (<p className="help is-danger" key={index}>{error}</p>)
            })}
          </div>
        </div>

        <div className="field">
          <label className="label">Additional Comments</label>
          <div className="control">
                        <textarea className={`card-textarea-sm textarea${this.state.errors.comments.length > 0 ? ' is-danger' : ''}`}
                                  value={this.state.comments}
                                  onChange={({target}) => this.setState({comments: target.value})}>
                        </textarea>
            {this.state.errors.comments.map((error, index) => {
              return (<p className="help is-danger" key={index}>{error}</p>)
            })}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">Flag Observation</button>
          </div>
        </div>
      </form>
    )
  }

  renderUndoForm() {
    return (
      <div>
        <div className="notification is-success">
          Observation has been flagged and administrators will be notified shortly.
        </div>

        <button className="button" onClick={this.undo.bind(this)}>Undo</button>
      </div>
    )
  }

  render() {
    if (!User.authenticated()) {
      return (
        <div className="content">
          <p>You must be logged in to flag this observation.</p>
          <p>Please <a href="/login">login</a> or <a href="/register">create an account</a> first.</p>
        </div>
      )
    }

    return (
      <div>
        {this.state.flagged ? this.renderUndoForm() : this.renderFlagForm()}
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}

FlagForm.propTypes = {
  observationId: PropTypes.number.isRequired,
  onSubmit     : PropTypes.func,
  flagged      : PropTypes.bool,
  onUndo       : PropTypes.func,
  flagId       : PropTypes.number
}

FlagForm.defaultProps = {
  flagged: 0,
  flagId : 0,
  onSubmit() {
  },
  onUndo() {
  }
}
