import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CollectionForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            collectionId: 0,
            name        : ''
        }
    }

    submit(event) {
        event.preventDefault()
    }

    render() {
        return (
            <form action="#" method="POST" onSubmit={this.submit.bind(this)}>
                <div className="field">
                    <label className="label">Collection Name</label>
                    <div className="control">
                        <span className="select">
                            <select value={this.state.collectionId} onChange={({target}) => this.setState({collectionId: target.value})}>
                                <option value="0">[Select Collection]</option>
                                {this.props.collections.map((collection, index) => {
                                    return (<option value={collection.value} key={index}>{collection.label}</option>)
                                })}
                            </select>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Or Create New Collection</label>
                    <div className="control">
                        <input type="text"
                               className="input"
                               onChange={({target}) => this.setState({name: target.value})}
                               value={this.state.name}
                               placeholder="Type new collection name"
                        />
                    </div>
                    <p className="help">
                        The selected observation will be automatically added to the newly created collection.
                    </p>
                </div>

                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">Add Observation</button>
                    </div>
                </div>
            </form>
        )
    }
}

CollectionForm.PropTypes = {
    observationId: PropTypes.number.isRequired,
    collections  : PropTypes.array
}

CollectionForm.defaultProps = {
    collections: []
}