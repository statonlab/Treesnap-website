import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FiltersHelpModal extends Component {
    render() {
        return (
            <div className={`modal${this.props.visible ? ' is-active' : ''}`}>
                <div className="modal-background" onClick={() => this.props.onCloseRequest()}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Filters Help</p>
                        <button type="button" className="delete" onClick={() => this.props.onCloseRequest()}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="content">
                            Help content here
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <a className="button is-success" onClick={() => this.props.onCloseRequest()}>Got it!</a>
                    </footer>
                </div>
            </div>
        )
    }
}

FiltersHelpModal.PropTypes = {
    onCloseRequest: PropTypes.func.isRequired,
    visible       : PropTypes.bool.isRequired
}