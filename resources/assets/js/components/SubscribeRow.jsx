import React, {Component} from 'react'

export default class SubscribeRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email   : '',
      message : '',
      errors  : {
        email: []
      },
      disabled: false
    }
  }

  render() {
    return (
      <div className="home-section">
        <div className="container is-small">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <h4 className="title is-4 has-text-centered">Get a notification once TreeSnap gets released</h4>
              <div className="field has-addons">
                <p className="control">
                  <input className={`input${this.state.errors.email.length ? ' is-danger' : ''}`}
                         type="email"
                         placeholder="Email"
                         value={this.state.email}
                         onChange={(e) => this.setState({email: e.target.value})}
                         disabled={this.state.disabled}
                  />
                  {this.state.errors.email.map((error, index) => {
                    return (
                      <p key={index} className="help is-danger">
                        {error}
                      </p>
                    )
                  })}
                </p>
                <p className="control">
                  <button type="submit"
                          onClick={this.submit.bind(this)}
                          className="button is-primary">
                    Notify Me!
                  </button>
                </p>
              </div>
              {this.state.message !== '' ?
                <p className="mb-1 has-text-success">{this.state.message}</p> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  submit(event) {
    event.preventDefault()

    axios.post('/web/user/subscribe', {
      email: this.state.email
    }).then(response => {
      this.setState({
        email   : '',
        message : 'Thank you for subscribing!',
        errors  : {
          email: []
        },
        disabled: true
      })
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        this.setState({
          errors: error.response.data
        })
      }
    })
  }
}
