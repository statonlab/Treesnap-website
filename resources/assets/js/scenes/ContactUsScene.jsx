import React, {Component} from 'react'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import LinksSidebar from '../components/LinksSidebar'
import ReCaptcha from 'react-google-recaptcha'
import KnowledgeSidebarLinks from '../helpers/KnowledgeSidebarLinks'

export default class ContactUsScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name        : '',
      email       : '',
      subject     : '',
      recaptcha   : '',
      message     : '',
      form_message: '',
      errors      : {}
    }

    document.title = 'Contact Us - TreeSnap'
  }

  componentDidMount() {
    window.fixHeight()
  }

  /**
   * Submit a new entry.
   *
   * @param e
   */
  submit(e) {
    e.preventDefault()

    axios.post('/contact', {
      name     : this.state.name,
      subject  : this.state.subject,
      email    : this.state.email,
      recaptcha: this.state.recaptcha,
      message  : this.state.message
    }).then(response => {
      this.setState({
        name        : '',
        subject     : '',
        email       : '',
        recaptcha   : '',
        message     : '',
        form_message: 'Email sent successfully. We\'ll get back to you as soon as possible.',
        errors      : {}
      })
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        this.setState({
          errors      : error.response.data,
          form_message: ''
        })
      }
    })
  }

  /**
   * Render help errors.
   *
   * @param key
   * @returns {null}
   * @private
   */
  _renderError(key) {
    if (!this.state.errors[key]) {
      return null
    }

    return this.state.errors[key].map((error, index) => {
      return (
        <p key={index} className="help is-danger">{error}</p>
      )
    })
  }

  _renderSuccessMessage() {
    if (this.state.form_message === '') {
      return null
    }

    return (
      <div className="alert is-success">
        {this.state.form_message}
      </div>
    )
  }

  /**
   * Render the page.
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <Navbar/>
        <div className="home-section short-content">
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <LinksSidebar links={KnowledgeSidebarLinks} title="Knowledge Base"/>
              </div>
              <div className="column">
                <div className="box">
                  <h1 className="title is-3">Contact Us</h1>
                  <div className="limit-width">
                    {this._renderSuccessMessage()}
                    <form action="#" method="post" onSubmit={this.submit.bind(this)}>
                      <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                          <input type="text"
                                 className={`input${this.state.errors.name ? ' is-danger' : ''}`}
                                 placeholder="Name"
                                 value={this.state.name}
                                 onChange={e => this.setState({name: e.target.value})}/>
                          {this._renderError('name')}
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                          <input type="email"
                                 className={`input${this.state.errors.email ? ' is-danger' : ''}`}
                                 placeholder="Email"
                                 value={this.state.email}
                                 onChange={e => this.setState({email: e.target.value})}/>
                          {this._renderError('email')}
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Subject</label>
                        <div className="control">
                          <input type="text"
                                 className={`input${this.state.errors.subject ? ' is-danger' : ''}`}
                                 placeholder="Subject"
                                 value={this.state.subject}
                                 onChange={e => this.setState({subject: e.target.value})}/>
                          {this._renderError('subject')}
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                                                    <textarea className={`textarea${this.state.errors.message ? ' is-danger' : ''}`}
                                                              placeholder="Message"
                                                              value={this.state.message}
                                                              onChange={e => this.setState({message: e.target.value})}>
                                                    </textarea>
                          {this._renderError('message')}
                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <ReCaptcha
                            sitekey="6Lfg5yAUAAAAAI1zWo0wO1b1YPbcIAjj_GDcLeaY"
                            onChange={value => this.setState({recaptcha: value})}/>
                          {this._renderError('recaptcha')}
                        </div>
                      </div>

                      <button type="submit" className="button is-primary">Send</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter/>
      </div>
    )
  }
}