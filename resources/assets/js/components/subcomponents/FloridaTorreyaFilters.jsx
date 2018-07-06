import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'

export default class HemlockFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heightNumericMin    : '',
      heightNumericMax    : '',
      diameterNumericMin  : '',
      diameterNumericMax  : '',
      numberRootSproutsMin: '',
      numberRootSproutsMax: '',
      seedsBinary         : [],
      conesMaleFemale     : [],
      deerRub             : [],
      torreyaFungalBlight : []
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
            <label className="label">Seeds</label>
            <ButtonList list={['Yes', 'No', 'I\'m not sure']}
                        onChange={seedsBinary => this._update('seedsBinary', seedsBinary)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Deer Rub</label>
            <ButtonList list={['Present', 'Absent', 'Not sure']}
                        onChange={deerRub => this._update('deerRub', deerRub)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Cones</label>
            <ButtonList
              list={['Absent', 'Male present', 'Female present', 'Not sure']}
              onChange={conesMaleFemale => this._update('conesMaleFemale', conesMaleFemale)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Fungal Blight</label>
            <ButtonList
              list={['Present', 'Absent', 'Not sure']}
              onChange={torreyaFungalBlight => this._update('torreyaFungalBlight', torreyaFungalBlight)}/>
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

        <div className="column is-6">
          <div className="field">
            <label className="label">Number of Root Sprouts</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Min."
                           value={this.state.numberRootSproutsMin}
                           onChange={({target}) => this._update('numberRootSproutsMin', target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Max."
                           value={this.state.numberRootSproutsMax}
                           onChange={({target}) => this._update('numberRootSproutsMax', target.value)}/>
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

HemlockFilters.PropTypes = {
  onChange: PropTypes.func.isRequired
}
