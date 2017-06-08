import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from './ButtonList'
import AmericanChestnutFilters from './subcomponents/AmericanChestnutFilters'
import AshFilters from './subcomponents/AshFilters'
import HemlockFilters from './subcomponents/HemlockFilters'

export default class AdvancedFiltersModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible           : false,
            categories        : [],
            selectedCategories: [],
            city              : '',
            state             : '',
            county            : '',
            filterName        : '',
            americanChestnut  : {},
            ash               : {},
            hemlock           : {}
        }
    }

    _resetForm() {
        this.setState({
            selectedCategories: this.state.categories
        })
    }

    componentWillMount() {
        this.setState({
            visible: this.props.visible
        })

        axios.get('/observations/categories').then(response => {
            this.setState({
                categories        : response.data.data,
                selectedCategories: response.data.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    componentWillReceiveProps(props) {
        if (this.state.visible !== props.visible) {
            this.setState({visible: props.visible})
        }
    }

    close() {
        this._resetForm()
        this.props.onCloseRequest()
    }

    submit(e) {
        e.preventDefault()

    }

    renderAmericanChestnutFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4"> American Chestnut Filters</h3>
                <div className="bordered">
                    <AmericanChestnutFilters onChange={(americanChestnut) => this.setState({americanChestnut})}/>
                </div>
            </div>
        )
    }

    renderAshFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4">Ash Filters</h3>
                <div className="bordered">
                    <AshFilters onChange={(ash) => this.setState({ash})}/>
                </div>
            </div>
        )
    }

    renderHemlockFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4">Hemlock Filters</h3>
                <div className="bordered">
                    <HemlockFilters onChange={(hemlock) => this.setState({hemlock})}/>
                </div>
            </div>
        )
    }

    renderForm() {
        return (
            <div className="columns is-multiline">
                <div className="column is-6">
                    <div className="field">
                        <label className="label">Species</label>
                        <ButtonList list={this.state.categories}
                                    onChange={selectedCategories => this.setState({selectedCategories})}
                                    selectedByDefault={true}
                        />
                    </div>
                </div>

                <div className="column is-6">
                    <div className="columns mb-none">
                        <div className="column is-6">
                            <div className="field mb-none">
                                <label className="label">City</label>
                                <div className="control">
                                    <input type="text" className="input"/>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field mb-none">
                                <label className="label">County</label>
                                <div className="control">
                                    <input type="text" className="input"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">State</label>
                        <div className="control">
                            <input type="text" className="input"/>
                        </div>
                    </div>
                </div>

                {this.state.selectedCategories.indexOf('American Chestnut') > -1 ? this.renderAmericanChestnutFilters() : null}

                {this.state.selectedCategories.indexOf('Ash') > -1 ? this.renderAshFilters() : null}

                {this.state.selectedCategories.indexOf('Hemlock') > -1 ? this.renderHemlockFilters() : null}

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Filter Name</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="Optional: label your filter"/>
                        </div>
                        <p className="help">
                            You can save your filter settings to easily reapply later or share with users.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={`modal${this.state.visible ? ' is-active' : ''}`}>
                <div className="modal-background" onClick={this.close.bind(this)}></div>
                <div className="modal-card modal-card-lg">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Advanced Filters</p>
                        <button type="button" className="delete" onClick={this.close.bind(this)}></button>
                    </header>
                    <section className="modal-card-body">
                        {this.renderForm()}
                    </section>
                    <footer className="modal-card-foot flex-space-between">
                        <button type="button"
                                className="button is-success"
                                onClick={this.submit.bind(this)}>
                            Apply
                        </button>
                        <p>Found <b>6</b> observations that match your filters</p>
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

AdvancedFiltersModal.PropTypes = {
    onCloseRequest: PropTypes.func.isRequired
}