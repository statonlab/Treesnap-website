import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'

export default class WhiteOakFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acorns              : [],
      heightFirstBranchMin: '',
      heightFirstBranchMax: '',
      oakHealthProblems   : [],
      crownHealth         : [],
      diameterNumericMin  : '',
      diameterNumericMax  : ''
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
            <label className="label">Crown Health</label>
            <ButtonList
              list={[
                '1 - Healthy',
                '2 - Thinning',
                '3 - Some dead branches (less than 50%)',
                '4 - Many dead branches (more than 50%)',
                '5 - Completely dead',
                'I\'m not sure'
              ]}
              onChange={crownHealth => this._update('crownHealth', crownHealth)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Health Problems</label>
            <ButtonList
              list={[
                'Dieback in canopy',
                'Defoliation',
                'Cankers',
                'Bark damage',
                'Signs of rot at base',
                'Other'
              ]}
              onChange={oakHealthProblems => this._update('oakHealthProblems', oakHealthProblems)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Acorns</label>
            <ButtonList
              list={['None', 'Some', 'Lots', 'I\'m not sure']}
              onChange={acorns => this._update('acorns', acorns)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Height of First Branch ({Utils.unit('feet')})</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Min."
                           value={this.state.heightFirstBranchMin}
                           onChange={({target}) => this._update('heightFirstBranchMin', target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Max."
                           value={this.state.heightFirstBranchMax}
                           onChange={({target}) => this._update('heightFirstBranchMax', target.value)}/>
                  </div>
                </div>
              </div>
            </div>
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

WhiteOakFilters.PropTypes = {
  onChange: PropTypes.func.isRequired
}
