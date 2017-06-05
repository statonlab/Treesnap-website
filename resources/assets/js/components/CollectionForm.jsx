import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

export default class CollectionForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading      : false,
            collection_id: 0,
            label        : '',
            errors       : {
                label        : [],
                collection_id: []
            }
        }
    }

    submit(event) {
        event.preventDefault()

        if (!this.validate()) {
            return
        }

        this.setState({loading: true})

        axios.post('/collection/attach', {
            observation_id: this.props.observationId,
            collection_id : this.state.collection_id || '',
            label         : this.state.label
        }).then(response => {
            this.setState({loading: true})
            this.props.onSubmit(response.data.data)
        }).catch(error => {
            const response = error.response
            if (response && response.status === 422) {
                const data = response.data
                this.setState({
                    loading: false,
                    errors : {
                        label        : data.label || [],
                        collection_id: data.collection_id || []
                    }
                })

                return
            }

            console.log(error)
        })
    }

    validate() {
        let label         = this.state.label
        let collection_id = this.state.collection_id

        if (label.trim() === '' && collection_id === 0) {
            this.setState({
                errors: {
                    label        : ['Please select an existing collection or type a new collection label.'],
                    collection_id: []
                }
            })

            return false
        }

        return true
    }

    render() {
        return (
            <form action="#" method="POST" onSubmit={this.submit.bind(this)}>
                <div className="field">
                    <label className="label">Collection Name</label>
                    <div className="control">
                        <span className={`select${this.state.errors.collection_id.length > 0 ? ' is-danger' : ''}`}>
                            <select value={this.state.collection_id}
                                    onChange={({target}) => this.setState({collection_id: target.value})}>
                                <option value="0">[Select Collection]</option>
                                {this.props.collections.map((collection, index) => {
                                    return (<option value={collection.value} key={index}>{collection.label}</option>)
                                })}
                            </select>
                        </span>
                        {this.state.errors.collection_id.map((error, index) => {
                            return (<p className="help is-danger" key={index}>{error}</p>)
                        })}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Or Create New Collection</label>
                    <div className="control">
                        <input type="text"
                               className={`input${this.state.errors.label.length > 0 ? ' is-danger' : ''}`}
                               onChange={({target}) => this.setState({label: target.value})}
                               value={this.state.label}
                               placeholder="Type new collection label"
                        />
                        {this.state.errors.label.map((error, index) => {
                            return (<p className="help is-danger" key={index}>{error}</p>)
                        })}
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

                <Spinner visible={this.state.loading}/>
            </form>
        )
    }
}

CollectionForm.PropTypes = {
    observationId: PropTypes.number.isRequired,
    collections  : PropTypes.array,
    onSubmit     : PropTypes.func
}

CollectionForm.defaultProps = {
    collections: [],
    onSubmit() {
    }
}