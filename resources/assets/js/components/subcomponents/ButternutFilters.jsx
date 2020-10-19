import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'
import ButtonList from '../ButtonList'

export default class ButternutFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      diameterNumericMin          : '',
      diameterNumericMax          : '',
      heightNumericMin            : '',
      heightNumericMax            : '',
      locationCharacteristics     : [],
      bearingFruit                : [],
      crownDieback                : [],
      hybridAttributes            : [],
      hybridTraits                : [],
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
            <label className="label">Habitat</label>
            <ButtonList
              value={this.state.locationCharacteristics}
              list={[
                'Forest',
                'Wetland',
                'Field',
                'Roadside, urban, suburban, or park'
              ]}
              onChange={locationCharacteristics => this._update('locationCharacteristics', locationCharacteristics)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Bearing Fruit</label>
            <ButtonList
              value={this.state.bearingFruit}
              list={[
                'Yes - Bumper crop',
                'Yes - A lot',
                'Yes - A few',
                'No'
              ]}
              onChange={bearingFruit => this._update('bearingFruit', bearingFruit)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Crown Dieback</label>
            <ButtonList
              value={this.state.crownDieback}
              list={[
                'No dieback / dead branches',
                '25% crown dieback',
                '50% crown dieback',
                '75% crown dieback',
                'near 100% crown dieback',
                'putatively dead'
              ]}
              onChange={crownDieback => this._update('crownDieback', crownDieback)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Hybrid Attributes</label>
            <ButtonList
              value={this.state.hybridAttributes}
              list={['Has apparent hybrid attributes', 'No hybrid attributes', 'Not sure']}
              onChange={hybridAttributes => this._update('hybridAttributes', hybridAttributes)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Hybrid Traits</label>
            <ButtonList
              value={this.state.hybridTraits}
              list={[
                'Leaves',
                'Nuts',
                'Leaf Scars',
                'Lenticels'
              ]}
              onChange={hybridTraits => this._update('hybridTraits', hybridTraits)}/>
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

ButternutFilters.propTypes = {
  onChange      : PropTypes.func.isRequired,
  defaultFilters: PropTypes.object
}

ButternutFilters.defaultProps = {
  defaultFilters: {}
}
