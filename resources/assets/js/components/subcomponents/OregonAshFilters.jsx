import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class OregonAshFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      crownPortion      : [],
      ashFrequency      : [],
      oregonAshHealth   : [],
      seedCollected     : [],
      diameterNumericMin: '',
      diameterNumericMax: '',
      heightNumericMin  : '',
      heightNumericMax  : ''
    }
  }

  _update(key, value) {
    this.setState({[key]: value})

    this.props.onChange(Object.assign({}, this.state, {[key]: value}))
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="field">
            <label className="label">Seed Crown Portion</label>
            <ButtonList
              value={this.state.crownPortion}
              list={['Top Third', 'Middle Third', 'Bottom Third', 'Throughout Crown']}
              onChange={crownPortion => this._update('crownPortion', crownPortion)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Ash Frequency</label>
            <ButtonList
              value={this.state.ashFrequency}
              list={['0', '1-5', '6-10', '>10']}
              onChange={ashFrequency => this._update('ashFrequency', ashFrequency)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Oregon Ash Health</label>
            <ButtonList
              value={this.state.oregonAshHealth}
              list={['Good', 'Fair']}
              onChange={oregonAshHealth => this._update('oregonAshHealth', oregonAshHealth)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Seed Collected</label>
            <ButtonList
              value={this.state.seedCollected}
              list={['Yes', 'No']}
              onChange={seedCollected => this._update('seedCollected', seedCollected)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Tree Diameter ({Utils.unit('inches')})</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Min."
                           value={this.state.diameterNumericMin}
                           onChange={({target}) => this._update('diameterNumericMin', target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Max."
                           value={this.state.diameterNumericMax}
                           onChange={({target}) => this._update('diameterNumericMax', target.value)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Tree Height ({Utils.unit('feet')})</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Min."
                           value={this.state.heightNumericMin}
                           onChange={({target}) => this._update('heightNumericMin', target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Max."
                           value={this.state.heightNumericMax}
                           onChange={({target}) => this._update('heightNumericMax', target.value)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OregonAshFilters.propTypes = {
  onChange      : PropTypes.func.isRequired,
  defaultFilters: PropTypes.object
}

OregonAshFilters.defaultProps = {
  defaultFilters: {}
}
