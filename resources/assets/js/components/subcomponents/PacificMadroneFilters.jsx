import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'

export default class PacificMadroneFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crownAssessment   : [],
      madroneDisease    : [],
      standDiversity    : [],
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
            <label className="label">Crown Damage</label>
            <ButtonList
              list={['< 10%', '10% to 20%', '20% to 50%', '50% to 75%', '> 75%']}
              onChange={crownAssessment => this._update('crownAssessment', crownAssessment)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Disease</label>
            <ButtonList list={['Wilting leaves', 'Leaf spots', 'Rust', 'Blight', 'Defoliation', 'Lesions', 'Cankers']}
                        onChange={madroneDisease => this._update('madroneDisease', madroneDisease)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Stand Diversity</label>
            <ButtonList list={['Pure stand of this species', 'Mixed stand (this species and others)', 'Tree is standing alone', 'Not sure']}
                        onChange={standDiversity => this._update('standDiversity', standDiversity)}/>
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

PacificMadroneFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
