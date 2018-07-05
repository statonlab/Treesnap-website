import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Errors from '../helpers/Errors'

export default class DeveloperTokensForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name  : '',
      errors: new Errors({
        name: ''
      })
    }
  }

  render() {
    return (
      <form action={'#'} onSubmit={event => this.generateTokens(event)} onKeyDown={this.clearError.bind(this)}>
        <div className="limit-width">
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Name</label>
            </div>
            <div className="field-body">
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <input type="text"
                         className={`input${this.state.errors.has('name') ? ' is-danger' : ''}`}
                         name="name"
                         placeholder="Descriptive name"
                         onChange={({target}) => this.setState({name: target.value})}
                         value={this.state.name}/>
                  {this.state.errors.has('name') ?
                    <p className="help is-danger">{this.state.errors.first('name')}</p>
                    : null}
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary">Generate Tokens</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  generateTokens(event) {
    event.preventDefault()

    axios.post('/web/oauth/personal-tokens', {
      name  : this.state.name,
    }).then(response => {
      this.state.errors.clear('name')
      this.setState({
        name: ''
      })
      this.props.onCreate(response.data.data)
    }).catch(error => {
      this.setState({
        errors: new Errors(error)
      })
    })
  }

  clearError(event) {
    this.state.errors.clear(event.nativeEvent.target.name)
  }
}

DeveloperTokensForm.propTypes = {
  onCreate: PropTypes.func.isRequired
}
