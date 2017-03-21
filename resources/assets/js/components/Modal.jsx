import React, {Component, PropTypes} from 'react'

export default class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    close() {
        this.setState({open: false})
    }

    open() {
        this.setState({open: true})
    }

    render() {
        return (
            <div className={`modal${this.state.open && ' is-active'}`}>
                <div className="modal-background" onClick={this.close.bind(this)}></div>
                <div className="modal-content">
                    <div className="box" style={{padding: '20px'}}>
                        <h3 className="title is-4" style={{borderBottom: '1px solid #dedede', paddingBottom: 10}}><strong>Login</strong></h3>
                        <form action="/" method="post">
                            <div className="field">
                                <label className="label">Username</label>
                                <p className="control">
                                    <input className="input" type="text" placeholder="Username" autoFocus={true}/>
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <p className="control">
                                    <input className="input" type="password" placeholder="Password" />
                                </p>
                            </div>

                            <div className="field">
                                <p className="control">
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                            Remember me
                                    </label>
                                </p>
                            </div>

                            <div className="field">
                                <button type="submit" className="button is-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <button className="modal-close" onClick={this.close.bind(this)}></button>
            </div>
        )
    }
}

Modal.PropTypes = {
    name: PropTypes.string.isRequired
}