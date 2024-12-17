import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class AmericanBeechFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      collectionPurpose: [],
      locationCharacteristics: [],
      nearbyTrees: [],
      flowersBinary: []
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
            <label className="label">Collection Purpose</label>
            <ButtonList
              value={this.state.collectionPurpose}
              list={['Landscape Genomics Project with University of Connecticut','Other Research Project','Personal Use','Not Available']}
              onChange={collectionPurpose => this._update('collectionPurpose', collectionPurpose)}/>
          </div>
        </div>
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
           <label className="label">Trees Nearby</label>
           <ButtonList
             value={this.state.nearbyTrees}
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
           <label className="label">Flowers</label>
           <ButtonList
             value={this.state.flowersBinary}
             list={[
               'Yes',
               'No'
             ]}
             onChange={flowersBinary => this._update('flowersBinary', flowersBinary)}/>
         </div>
        </div>
      </div>
    )
  }
}

AmericanBeechFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
