import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class TanOakFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      diameterNumericMin  : '',
      diameterNumericMax  : '',
      crownClassification : [],
      canopyHealth        : [],
      acorns              : [],
      treated             : [],
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
            <label className="label">Crown Classification</label>
            <ButtonList
              value={this.state.crownClassification}
              list={[
                'Dominant. This tree\'s crown extends above others in the area.',
                'Codominant. This tree\'s crown is level with or slightly below other nearby trees.',
                'Overtopped. This tree\'s crown is entirely below other trees nearby.',
                'Not applicable (Tree is isolated)',
                'I\'m not sure.'
              ]}
              onChange={crownClassification => this._update('crownClassification', crownClassification)}/>
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
            <label className="label">Acorns</label>
            <ButtonList
              value={this.state.acorns}
              list={['None', 'Some', 'Lots', 'I\'m not sure']}
              onChange={acorns => this._update('acorns', acorns)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Treated with Fungicides or Pesticides</label>
            <ButtonList
              value={this.state.treated}
              list={['Yes', 'No', 'Don\'t know']}
              onChange={treated => this._update('treated', treated)}/>
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

TanOakFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
