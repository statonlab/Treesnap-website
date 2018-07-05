import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'

export default class HemlockFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      woollyAdesCoverage     : [],
      cones                  : [],
      crownClassification    : [],
      locationCharacteristics: [],
      nearbyTrees            : [],
      crownHealth            : [],
      hemlockSpecies         : [],
      diameterNumericMin     : '',
      diameterNumericMax     : ''
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
            <label className="label">Species</label>
            <ButtonList
              list={[
                'Eastern hemlock (Tsuga canadensis)',
                'Carolina hemlock (Tsuga caroliniana)',
                'Other hemlock species',
                'I\'m not sure'
              ]}
              onChange={hemlockSpecies => this._update('hemlockSpecies', hemlockSpecies)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Woolly Adelgids</label>
            <ButtonList list={['0%', '1-24%', '25-49%', '50-74%', '75-100%']}
                        onChange={woollyAdesCoverage => this._update('woollyAdesCoverage', woollyAdesCoverage)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Cones</label>
            <ButtonList list={['Yes', 'No']}
                        onChange={cones => this._update('cones', cones)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Crown Classification</label>
            <ButtonList
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

HemlockFilters.PropTypes = {
  onChange: PropTypes.func.isRequired
}
