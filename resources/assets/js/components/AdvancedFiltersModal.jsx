import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonList from './ButtonList'
import AmericanChestnutFilters from './subcomponents/AmericanChestnutFilters'
import AshFilters from './subcomponents/AshFilters'
import HemlockFilters from './subcomponents/HemlockFilters'
import AmericanElmFilters from './subcomponents/AmericanElmFilters'
import WhiteOakFilters from './subcomponents/WhiteOakFilters'
import FloridaTorreya from './subcomponents/FloridaTorreyaFilters'
import EasternLarchFilters from './subcomponents/EasternLarchFilters'
import OtherFilters from './subcomponents/OtherFilters'
import User from '../helpers/User'

export default class AdvancedFiltersModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
      floridaTorreya    : {},
      easternLarch      : {},
      other             : {},
      resultsCount      : 0,
      loading           : false,
      errors            : {}
    }
  }

  _resetForm() {
    this.setState({
      selectedCategories: [],
      city              : '',
      county            : '',
      state             : '',
      filterName        : '',
      resultsCount      : 0
    })
    this.refs.speciesButtonList.reset()
  }

  componentWillMount() {
    axios.get('/web/observations/categories').then(response => {
      this.setState({
        categories: response.data.data
        //selectedCategories: response.data.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  close() {
    this._resetForm()

    this.props.onCloseRequest()
  }

  submit(e) {
    e.preventDefault()

    this.setState({loading: true})
    let params = {
      name            : this.state.filterName,
      categories      : this.state.selectedCategories,
      ash             : this.state.ash,
      americanChestnut: this.state.americanChestnut,
      hemlock         : this.state.hemlock,
      americanElm     : this.state.americanElm,
      whiteOak        : this.state.whiteOak,
      floridaTorreya  : this.state.floridaTorreya,
      easternLarch    : this.state.easternLarch,
      other           : this.state.other,
      address         : {
        city  : this.state.city,
        county: this.state.county,
        state : this.state.state
      },
      map             : this.props.map
    }

    let url = '/web/filters'
    if (this.props.withObservations) {
      url += '/observations'
    }

    axios.post(url, params).then(({data}) => {
      this.setState({
        loading: false,
        errors : {}
      })

      this.props.onCreate({
        params,
        data: data.data
      })

      this.props.onStateChange(_.clone(this.state))

      this._resetForm()
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

    axios.post('/web/filter/count', {
      categories      : filters.selectedCategories,
      ash             : filters.ash,
      americanChestnut: filters.americanChestnut,
      hemlock         : filters.hemlock,
      americanElm     : filters.americanElm,
      whiteOak        : filters.whiteOak,
      other           : filters.other,
      floridaTorreya  : filters.floridaTorreya,
      easternLarch    : filters.easternLarch,
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

  renderFloridaTorreyaFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Florida Torreya Filters (Optional)</h3>
        <div className="bordered">
          <FloridaTorreya onChange={(floridaTorreya) => this.count({floridaTorreya})}/>
        </div>
      </div>
    )
  }

  renderEasternLarchFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Eastern Larch Filters (Optional)</h3>
        <div className="bordered">
          <EasternLarchFilters onChange={(easternLarch) => this.count({easternLarch})}/>
        </div>
      </div>
    )
  }

  renderOtherFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Other Trees Filters (Optional)</h3>
        <div className="bordered">
          <OtherFilters onChange={(other) => this.count({other})}/>
        </div>
      </div>
    )
  }

  renderForm() {
    return (
      <div className="columns is-multiline">
        {User.authenticated() ?
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
          : null}

        <div className="column is-6">
          <div className="field">
            <label className="label">Species</label>
            <p className="mb-1">
              Begin by selecting the species you are interested in.
            </p>
            <ButtonList ref="speciesButtonList"
                        list={this.state.categories}
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

        {this.state.selectedCategories.map((label, index) => {
          const key = 'render' + label.replace(' ', '') + 'Filters'
          if (typeof this[key] === 'function') {
            return (
              <div style={{width: '100%'}} key={index}>
                {this[key]()}
              </div>
            )
          }
          return null
        })}

        <div className="column is-6"></div>

        {User.authenticated() ?
          <div className="column is-12">
            <div className="field">
              <div className="control">
                <label className="label checkbox">
                  <input type="checkbox" className="mr-0" defaultChecked={false}/>
                  Notify me via email if new observations fitting this criteria get submitted
                </label>
                <p className="help mr-1">Maximum of 3 emails per week.</p>
              </div>
            </div>
          </div>
          : null}
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
    if (!this.props.visible) {
      return null
    }

    return (
      <div className={`modal is-active`}>
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
            {this.props.showCount ?
              <p>
                Found <b>{this.state.resultsCount || 0}</b> observations that fit your criteria
              </p>
              : null}
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

  reapplyState(state) {
    this.setState(state)
    if (state.selectedCategories) {
      this.refs.speciesButtonList.setSelected(state.selectedCategories)
    }
  }
}

AdvancedFiltersModal.propTypes = {
  visible         : PropTypes.bool.isRequired,
  onCloseRequest  : PropTypes.func.isRequired,
  onCreate        : PropTypes.func.isRequired,
  map             : PropTypes.bool,
  withObservations: PropTypes.bool,
  onStateChange   : PropTypes.func,
  showCount       : PropTypes.bool
}

AdvancedFiltersModal.defaultProps = {
  map             : false,
  withObservations: true,
  showCount       : false,
  onStateChange() {
  }
}
