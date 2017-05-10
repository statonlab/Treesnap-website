import React, {Component} from 'react'
import marked from 'marked'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import KnowledgeSidebar from '../components/KnowledgeSidebar'

export default class ContactUsScene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    render() {
        return (
            <div className="document">
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
                                                    <input type="text" className="input" placeholder="Name"/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Email</label>
                                                <div className="control">
                                                    <input type="email" className="input" placeholder="Email"/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Subject</label>
                                                <div className="control">
                                                    <input type="text" className="input" placeholder="Subject"/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Message</label>
                                                <div className="control">
                                                    <textarea className="textarea" placeholder="Message"></textarea>
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