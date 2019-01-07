import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class HemlockFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      diameterNumericMin: '',
      diameterNumericMax: '',
      needleColor       : [],
      needleAmount      : []
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
            <label className="label">Needles Color</label>
            <ButtonList
              value={this.state.needleColor}
              list={[
                'Green',
                'Green Blue',
                'Green Yellow',
                'Golden Yellow'
              ]}
              onChange={needleColor => this._update('needleColor', needleColor)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Amount of Needles</label>
            <ButtonList
              value={this.state.needleAmount}
              list={[
                'Full',
                'Falling',
                'Sparse',
                'Bare'
              ]}
              onChange={needleAmount => this._update('needleAmount', needleAmount)}/>
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
      </div>
    )
  }
}

HemlockFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
