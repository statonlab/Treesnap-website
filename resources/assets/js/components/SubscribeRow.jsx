import React, {Component} from 'react'

export default class SubscribeRow extends Component {
    render() {
        return (
            <div className="home-section">
                <div className="container is-small">
                    <div className="columns">
                        <div className="column is-6 is-offset-3">
                            <h4 className="title is-4">Get a notification once TreeSnap gets released</h4>
                            <div className="field has-addons">
                                <p className="control">
                                    <input className="input" type="text" placeholder="Email"/>
                                </p>
                                <p className="control">
                                    <button type="submit" className="button is-primary">
                                        Get Notified!
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
