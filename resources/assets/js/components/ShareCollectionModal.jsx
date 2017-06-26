import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class ShareCollectionModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }


    close() {
        this.props.onCloseRequest()
    }

    render() {
        return (
            <div className={`modal${this.props.visible ? ' is-active' : ''}`}>
                <div className="modal-background" onClick={this.close.bind(this)}></div>
                <div className="modal-card modal-card-lg">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Share {this.props.collection.label}</p>
                        <button type="button" className="delete" onClick={this.close.bind(this)}></button>
                    </header>
                    <section className="modal-card-body" id="filters-card-body">

                    </section>
                    <footer className="modal-card-foot flex-space-between">
                        <button type="button"
                                className={`button is-success${this.state.loading ? ' is-loading' : ''}`}
                                disabled={this.state.loading}
                                onClick={this.submit.bind(this)}>
                            Share
                        </button>
                        <button type="button"
                                className="button"
                                onClick={this.close.bind(this)}>
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        )
    }
}

ShareCollectionModal.PropTypes = {
    visible       : PropTypes.bool.isRequired,
    onCloseRequest: PropTypes.func.isRequired,
    collection    : PropTypes.object
}

ShareCollectionModal.defaultProps = {
    collection: {
        label: ''
    }
}