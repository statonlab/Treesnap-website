import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FlagForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reason  : 0,
            comments: ''
        }

        this.reasons = [
            'This tree is the wrong species',
            'This tree is on my private land and i would like it removed',
            'This submission is spam',
            'This submission is inappropriate'
        ]
    }

    submit(event) {
        event.preventDefault()
    }

    render() {
        return (
            <form action="#" method="POST" onSubmit={this.submit.bind(this)}>
                <div className="field">
                    <label className="label">Reason</label>
                    <div className="control">
                        <span className="select">
                            <select value={this.state.reason}
                                    onChange={({target}) => this.setState({reason: target.value})}>
                                <option value="0" disabled={true}>[Reason]</option>
                                {this.reasons.map((reason, index) => {
                                    return (<option value={reason} key={index}>{reason}</option>)
                                })}
                            </select>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Additional Comments</label>
                    <div className="control">
                        <textarea className="textarea"
                                  value={this.state.comments}
                                  onChange={({target}) => this.setState({comments: target.value})}>
                        </textarea>
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
}

FlagForm.PropTypes = {
    observationId: PropTypes.number.isRequired
}