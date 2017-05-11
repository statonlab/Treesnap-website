import React, {Component} from 'react'
import marked from 'marked'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import KnowledgeSidebar from '../components/KnowledgeSidebar'
import ReCaptcha from 'react-google-recaptcha'

export default class ContactUsScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name     : '',
            email    : '',
            subject  : '',
            recaptcha: '',
            message  : ''
        }
    }

    submit(e) {
        e.preventDefault()

        axios.post('/contact', {
            name     : this.state.name,
            subject  : this.state.subject,
            email    : this.state.email,
            recaptcha: this.state.recaptcha
        }).then(response => {
            this.setState({
                name     : '',
                subject  : '',
                email    : '',
                recaptcha: '',
                message  : 'Email sent successfully. We\'ll get back to you as soon as possible.'
            })
        }).catch(error => {
            this.setState({
                message: ''
            })
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="home-section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-3-tablet is-2-desktop">
                                <KnowledgeSidebar/>
                            </div>
                            <div className="column">
                                <div className="box">
                                    <h1 className="title is-3">Contact Us</h1>
                                    <div className="limit-width">
                                        <form action="#" method="post">
                                            <div className="field">
                                                <label className="label">Name</label>
                                                <div className="control">
                                                    <input type="text"
                                                           className="input"
                                                           placeholder="Name"
                                                           value={this.state.name}
                                                           onChange={e => this.setState({name: e.target.value})}/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Email</label>
                                                <div className="control">
                                                    <input type="email"
                                                           className="input"
                                                           placeholder="Email"
                                                           value={this.state.email}
                                                           onChange={e => this.setState({email: e.target.value})}/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Subject</label>
                                                <div className="control">
                                                    <input type="text"
                                                           className="input"
                                                           placeholder="Subject"
                                                           value={this.state.subject}
                                                           onChange={e => this.setState({subject: e.target.value})}/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Message</label>
                                                <div className="control">
                                                    <textarea className="textarea"
                                                              placeholder="Message"
                                                              value={this.state.message}
                                                              onChange={e => this.setState({message: e.target.value})}>
                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <div className="control">
                                                    <ReCaptcha
                                                        sitekey="6Lfg5yAUAAAAAI1zWo0wO1b1YPbcIAjj_GDcLeaY"
                                                        onChange={value => this.setState({recaptcha: value})}/>
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