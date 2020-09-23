import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'
import OregonAshFilters from './OregonAshFilters'
import ButtonList from '../ButtonList'

export default class PinyonPineFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      breastNumericMin: '',
      breastNumericMax: '',
      heightNumericMin  : '',
      heightNumericMax  : '',
      canopyCones       : [],
      conesOpenClosed   : [],
      neighborCones     : [],
      neighborHealth    : [],
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
            <label className="label">Canopy Cones</label>
            <ButtonList
              value={this.state.canopyCones}
              list={['< 25%', '25-50%', '50-75%', '> 75%']}
              onChange={canopyCones => this._update('canopyCones', canopyCones)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Canopy Cones</label>
            <ButtonList
              value={this.state.canopyCones}
              list={[
                '100% brown and open',
                '75% brown and open, 25% green/purple and closed',
                '50% brown and open, 50% green/purple and closed',
                '25% brown and open, 75% green/purple and closed',
                '100% green/purple and closed'
              ]}
              onChange={canopyCones => this._update('canopyCones', canopyCones)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Canopy Cones</label>
            <ButtonList
              value={this.state.canopyCones}
              list={[
                '100% brown and open',
                '75% brown and open, 25% green/purple and closed',
                '50% brown and open, 50% green/purple and closed',
                '25% brown and open, 75% green/purple and closed',
                '100% green/purple and closed'
              ]}
              onChange={canopyCones => this._update('canopyCones', canopyCones)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Neighbor Cones</label>
            <ButtonList
              value={this.state.neighborCones}
              list={['Yes', 'No']}
              onChange={neighborCones => this._update('neighborCones', neighborCones)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Neighbors Healthy</label>
            <ButtonList
              value={this.state.neighborCones}
              list={['Yes', 'No']}
              onChange={neighborCones => this._update('neighborCones', neighborCones)}/>
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
                           value={this.state.breastNumericMin}
                           onChange={({target}) => this._update('breastNumericMin', target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Max."
                           value={this.state.breastNumericMax}
                           onChange={({target}) => this._update('breastNumericMax', target.value)}/>
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

PinyonPineFilters.propTypes = {
  onChange      : PropTypes.func.isRequired,
  defaultFilters: PropTypes.object
}

PinyonPineFilters.defaultProps = {
  defaultFilters: {}
}
