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
import TanOakFilters from './subcomponents/TanOakFilters'
import PacificMadroneFilters from './subcomponents/PacificMadroneFilters'
import OtherFilters from './subcomponents/OtherFilters'
import User from '../helpers/User'
import DatePicker from './DatePicker'

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
      tanOak            : {},
      pacificMadrone    : {},
      other             : {},
      resultsCount      : 0,
      loading           : false,
      errors            : {},
      startDate         : null,
      endDate           : null,
      groups            : [],
      selectedGroup     : -1
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

    this.loadGroups()
  }

  async loadGroups() {
    try {
      const response = await axios.get('/web/groups')
      this.setState({
        groups: response.data.data
      })
    } catch (e) {
      console.error(e)
    }
  }

  close() {
    this._resetForm()

    this.props.onCloseRequest()
  }

  submit(e) {
    e.preventDefault()

    this.setState({loading: true})
    const selectedGroup = parseInt(this.state.selectedGroup)

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
      tanOak          : this.state.tanOak,
      pacificMadrone  : this.state.pacificMadrone,
      other           : this.state.other,
      map             : this.props.map,
      group           : selectedGroup === -1 ? null : selectedGroup,
      address         : {
        city  : this.state.city,
        county: this.state.county,
        state : this.state.state
      },
      date_range      : {
        start: this.state.startDate ? this.state.startDate.format('YYYY-MM-DD') : null,
        end  : this.state.endDate ? this.state.endDate.format('YYYY-MM-DD') : null
      }
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
      tanOak          : filters.tanOak,
      pacificMadrone  : filters.pacificMadrone,
      address         : {
        city  : filters.city,
        county: filters.county,
        state : filters.state
      },
      date_range      : {
        start: this.state.startDate ? this.state.startDate.format('YYYY-MM-DD') : null,
        end  : this.state.endDate ? this.state.endDate.format('YYYY-MM-DD') : null
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
          <AmericanChestnutFilters
            defaultFilters={this.state.americanChestnut}
            onChange={(americanChestnut) => this.count({americanChestnut})}/>
        </div>
      </div>
    )
  }

  renderAmericanElmFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">American Elm Filters (Optional)</h3>
        <div className="bordered">
          <AmericanElmFilters
            defaultFilters={this.state.americanElm}
            onChange={(americanElm) => this.count({americanElm})}/>
        </div>
      </div>
    )
  }

  renderWhiteOakFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">White Oak Filters (Optional)</h3>
        <div className="bordered">
          <WhiteOakFilters
            defaultFilters={this.state.whiteOak}
            onChange={(whiteOak) => this.count({whiteOak})}/>
        </div>
      </div>
    )
  }

  renderAshFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Ash Filters (Optional)</h3>
        <div className="bordered">
          <AshFilters
            defaultFilters={this.state.ash}
            onChange={(ash) => this.count({ash})}/>
        </div>
      </div>
    )
  }

  renderHemlockFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Hemlock Filters (Optional)</h3>
        <div className="bordered">
          <HemlockFilters
            defaultFilters={this.state.hemlock}
            onChange={(hemlock) => this.count({hemlock})}/>
        </div>
      </div>
    )
  }

  renderFloridaTorreyaFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Florida Torreya Filters (Optional)</h3>
        <div className="bordered">
          <FloridaTorreya
            defaultFilters={this.state.floridaTorreya}
            onChange={(floridaTorreya) => this.count({floridaTorreya})}/>
        </div>
      </div>
    )
  }

  renderEasternLarchFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Eastern Larch Filters (Optional)</h3>
        <div className="bordered">
          <EasternLarchFilters
            defaultFilters={this.state.easternLarch}
            onChange={(easternLarch) => this.count({easternLarch})}/>
        </div>
      </div>
    )
  }

  renderTanOakFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Tan Oak Filters (Optional)</h3>
        <div className="bordered">
          <TanOakFilters
            defaultFilters={this.state.tanOak}
            onChange={(tanOak) => this.count({tanOak})}/>
        </div>
      </div>
    )
  }

  renderPacificMadroneFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Pacific Madrone Filters (Optional)</h3>
        <div className="bordered">
          <PacificMadroneFilters
            defaultFilters={this.state.pacificMadrone}
            onChange={(pacificMadrone) => this.count({pacificMadrone})}/>
        </div>
      </div>
    )
  }

  renderOtherFilters() {
    return (
      <div className="column is-12">
        <h3 className="title is-4 mb-0">Other Trees Filters (Optional)</h3>
        <div className="bordered">
          <OtherFilters
            defaultFilters={this.state.other}
            onChange={(other) => this.count({other})}/>
        </div>
      </div>
    )
  }

  renderForm() {
    return (
      <div className="columns is-multiline">
        {User.authenticated() ?
          <div className="column is-6">
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

        {User.authenticated() ?
          <div className="column is-6">
            <div className="field">
              <label className="label">Group</label>
              <div className="control">
                <span className="select">
                  <select
                    placeholder="Select a Group"
                    value={this.state.selectedGroup}
                    onChange={({target}) => this.setState({selectedGroup: target.value})}>
                    <option value={-1}>Select a Group</option>
                    {this.state.groups.map(group => {
                      return (<option key={group.id} value={group.id}>{group.name}</option>)
                    })}
                  </select>
                </span>
              </div>
              <p className="help">
                You can limit the results of this filter to observations uploaded by your group members.
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
                        value={this.state.selectedCategories}
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

        <div className="column is-6">
          <div className="field">
            <label className="label">Submission Date Range (Optional)</label>
            <div className="field is-horizontal">
              <div className="field-body mr-1">
                <div className="control">
                  <DatePicker
                    id={'start_date'}
                    placeholder={'Start Date'}
                    onDateChange={startDate => this.setState({startDate})}
                    date={this.state.startDate}/>
                </div>
              </div>
              <div className="field-body">
                <div className="control">
                  <DatePicker
                    id={'end_date'}
                    placeholder={'End Date'}
                    onDateChange={endDate => this.setState({endDate})}
                    date={this.state.endDate}/>
                </div>
              </div>
            </div>
          </div>
        </div>

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
