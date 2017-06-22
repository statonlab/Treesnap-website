import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from './ButtonList'
import AmericanChestnutFilters from './subcomponents/AmericanChestnutFilters'
import AshFilters from './subcomponents/AshFilters'
import HemlockFilters from './subcomponents/HemlockFilters'
import AmericanElmFilters from './subcomponents/AmericanElmFilters'
import WhiteOakFilters from './subcomponents/WhiteOakFilters'

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
            hemlock           : {},
            americanElm       : {},
            whiteOak          : {},
            resultsCount      : 0,
            loading           : false,
            errors            : {}
        }
    }

    _resetForm() {
        this.setState({
            //selectedCategories: this.state.categories
        })
    }

    componentWillMount() {
        this.setState({
            visible: this.props.visible
        })

        axios.get('/observations/categories').then(response => {
            this.setState({
                categories: response.data.data
                //selectedCategories: response.data.data
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

        this.setState({loading: true})
        axios.post('/api/filters', {
            name            : this.state.filterName,
            categories      : this.state.selectedCategories,
            ash             : this.state.ash,
            americanChestnut: this.state.americanChestnut,
            hemlock         : this.state.hemlock,
            americanElm     : this.state.americanElm,
            whiteOak        : this.state.whiteOak,
            address         : {
                city  : this.state.city,
                county: this.state.county,
                state : this.state.state
            }
        }).then(response => {
            this.setState({
                loading: false,
                errors : {}
            })

            this.props.onCreate(response.data.data)
        }).catch(error => {
            let response = error.response

            if (response && response.status === 422) {
                this.setState({errors: response.data})
                document.getElementById('filters-card-body').scrollTop = 0
            }

            this.setState({loading: false})
        })
    }

    count(changed) {
        let key     = Object.keys(changed)[0]
        let filters = Object.assign({}, this.state, {[key]: changed[key]})

        this.setState({
            loading: true,
            [key]  : changed[key]
        })

        axios.post('/api/filter/count', {
            categories      : filters.selectedCategories,
            ash             : filters.ash,
            americanChestnut: filters.americanChestnut,
            hemlock         : filters.hemlock,
            americanElm     : filters.americanElm,
            whiteOak        : filters.whiteOak,
            address         : {
                city  : filters.city,
                county: filters.county,
                state : filters.state
            }
        }).then(response => {
            this.setState({
                loading     : false,
                resultsCount: response.data.data.count
            })
        }).catch(error => {
            console.log(error.response)
            this.setState({loading: false})
        })
    }

    renderAmericanChestnutFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4 mb-0">American Chestnut Filters (Optional)</h3>
                <div className="bordered">
                    <AmericanChestnutFilters onChange={(americanChestnut) => this.count({americanChestnut})}/>
                </div>
            </div>
        )
    }

    renderAmericanElmFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4 mb-0">American Elm Filters (Optional)</h3>
                <div className="bordered">
                    <AmericanElmFilters onChange={(americanElm) => this.count({americanElm})}/>
                </div>
            </div>
        )
    }

    renderWhiteOakFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4 mb-0">White Oak Filters (Optional)</h3>
                <div className="bordered">
                    <WhiteOakFilters onChange={(whiteOak) => this.count({whiteOak})}/>
                </div>
            </div>
        )
    }

    renderAshFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4 mb-0">Ash Filters (Optional)</h3>
                <div className="bordered">
                    <AshFilters onChange={(ash) => this.count({ash})}/>
                </div>
            </div>
        )
    }

    renderHemlockFilters() {
        return (
            <div className="column is-12">
                <h3 className="title is-4 mb-0">Hemlock Filters (Optional)</h3>
                <div className="bordered">
                    <HemlockFilters onChange={(hemlock) => this.count({hemlock})}/>
                </div>
            </div>
        )
    }

    renderForm() {
        return (
            <div className="columns is-multiline">
                <div className="column is-12">
                    <div className="field">
                        <label className="label">Filter Name</label>
                        <div className="control">
                            <input type="text"
                                   className="input"
                                   placeholder="Optional: label your filter"
                                   value={this.state.filterName}
                                   onChange={({target}) => this.setState({filterName: target.value})}/>
                        </div>
                        <p className="help">
                            You can save your filter settings to easily reapply later or share with others.
                        </p>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Species</label>
                        <p className="mb-1">
                            Begin by selecting the species you are interested in.
                        </p>
                        <ButtonList list={this.state.categories}
                                    onChange={selectedCategories => this.count({selectedCategories})}
                        />
                    </div>
                </div>

                <div className="column is-6">
                    <div className="columns mb-none">
                        <div className="column is-6">
                            <div className="field mb-none">
                                <label className="label">City</label>
                                <div className="control">
                                    <input type="text"
                                           className="input"
                                           placeholder="E.g, Knoxville"
                                           value={this.state.city}
                                           onChange={({target}) => this.count({city: target.value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field mb-none">
                                <label className="label">County</label>
                                <div className="control">
                                    <input type="text"
                                           className="input"
                                           placeholder="E.g, Knox County"
                                           value={this.state.county}
                                           onChange={({target}) => this.count({county: target.value})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">State</label>
                        <div className="control">
                            <input type="text"
                                   className="input"
                                   placeholder="E.g, Tennessee"
                                   value={this.state.state}
                                   onChange={({target}) => this.count({state: target.value})}/>
                        </div>
                    </div>
                </div>

                {this.state.selectedCategories.indexOf('American Chestnut') > -1 ? this.renderAmericanChestnutFilters() : null}

                {this.state.selectedCategories.indexOf('Ash') > -1 ? this.renderAshFilters() : null}

                {this.state.selectedCategories.indexOf('Hemlock') > -1 ? this.renderHemlockFilters() : null}

                {this.state.selectedCategories.indexOf('White Oak') > -1 ? this.renderWhiteOakFilters() : null }

                {this.state.selectedCategories.indexOf('American Elm') > -1 ? this.renderAmericanElmFilters() : null }

                <div className="column is-6"></div>

                <div className="column is-12">
                    <div className="field">
                        <div className="control">
                            <label className="label checkbox">
                                <input type="checkbox" className="mr-0" defaultChecked={true}/>
                                Notify me via email if new observations fitting this criteria get submitted
                            </label>
                            <p className="help mr-1">Maximum of 3 emails per week.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderErrors() {
        let keys = Object.keys(this.state.errors)
        if (keys.length === 0) {
            return
        }

        let errors = this.state.errors

        return (
            <div className="alert is-danger">
                {keys.map((key) => {
                    return errors[key].map((error, index) => {
                        return (<p key={index}>{error}</p>)
                    })
                })}
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
                    <section className="modal-card-body" id="filters-card-body">
                        {this.renderErrors()}
                        {this.renderForm()}
                    </section>
                    <footer className="modal-card-foot flex-space-between">
                        <button type="button"
                                className={`button is-success${this.state.loading ? ' is-loading' : ''}`}
                                disabled={this.state.loading}
                                onClick={this.submit.bind(this)}>
                            Apply
                        </button>
                        <p>Found <b>{this.state.resultsCount}</b> observations that fit your criteria</p>
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
    onCloseRequest: PropTypes.func.isRequired,
    onCreate      : PropTypes.func.isRequired
}