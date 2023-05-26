import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class OzarkChinquapinFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      catkins           : [],
      chestnutBlight    : [],
      canopyHealth        : [],
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
            <label className="label">Catkins</label>
            <ButtonList
              value={this.state.catkins}
              list={['Present', 'Absent', 'Unknown']}
              onChange={catkins => this._update('catkins', catkins)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Chestnut Blight</label>
            <ButtonList
              value={this.state.chestnutBlight}
              list={[
                'Cankers and cracked bark',
                'Tan to orange-colored patches or pustules on bark',
                'Evidence of old dead trunk',
                'Stump sprouting'
              ]}
              onChange={chestnutBlight => this._update('chestnutBlight', chestnutBlight)}/>
          </div>
        </div>

          <div className="column is-6">
              <div className="field">
                  <label className="label">Canopy Health</label>
                  <ButtonList
                      value={this.state.canopyHealth}
                      list={[
                          'Healthy (no dead leaves)',
                          'Some dead leaves (less than 10%)',
                          'Many dead leaves (more than 10%)',
                          'Completely dead',
                          'I\'m not sure',
                      ]}
                      onChange={canopyHealth => this._update('canopyHealth', canopyHealth)}/>
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

OzarkChinquapinFilters.propTypes = {
  onChange      : PropTypes.func.isRequired,
  defaultFilters: PropTypes.object
}

OzarkChinquapinFilters.defaultProps = {
  defaultFilters: {}
}
