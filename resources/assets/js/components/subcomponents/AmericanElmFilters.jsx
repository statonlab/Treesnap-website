import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'

export default class AmericanElmFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      diameterNumericMin     : '',
      diameterNumericMax     : '',
      crownHealth            : [],
      locationCharacteristics: [],
      nearbyTrees            : [],
      seedsBinary            : [],
      flowersBinary          : []
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
            <label className="label">Habitat</label>
            <ButtonList
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
            <label className="label">Trees Nearby</label>
            <ButtonList
              list={[
                'Dead and/or dying',
                'Healthy and large',
                'Healthy and small',
                'No trees of this species nearby',
                'Not sure'
              ]}
              onChange={nearbyTrees => this._update('nearbyTrees', nearbyTrees)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Tree Diameter (inches)</label>
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

AmericanElmFilters.PropTypes = {
  onChange: PropTypes.func.isRequired
}