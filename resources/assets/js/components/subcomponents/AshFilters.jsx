import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class AshFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      ashCollectionPurpose: [],
      species: [],
      // locationCharacteristics: [],
      // seedsBinary            : [],
      // flowersBinary          : [],
      emeraldAshBorer: [],
      // nearbyTrees            : [],
      // crownHealth            : [],
      ashDiameterNumericMin: '',
      ashDiameterNumericMax: ''
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
              value={this.state.ashCollectionPurpose}
              list={['(MaMA Protocol) Lingering Ash Search', '(MaMA Protocol) EAB Sighting', 'Other Research Project', 'Personal Use', 'Not Available']}
              onChange={ashCollectionPurpose => this._update('ashCollectionPurpose', ashCollectionPurpose)}/>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Ash Species</label>
            <ButtonList
              value={this.state.species}
              list={['Ash sp.',
                'White ash (Fraxinus americana)',
                'Green ash (F. pennsylvanica)',
                'Blue ash (F. nigra)',
                'Black ash (F. quadrangulata)',
                'Pumpkin ash (F. profunda)',
                'Not sure if this is ash']}
              onChange={species => this._update('species', species)}/>
          </div>
        </div>

        {/*will not work due to separation between mama and non-mama surveys*/}
        {/*<div className="column is-6">*/}
        {/*  <div className="field">*/}
        {/*    <label className="label">Habitat</label>*/}
        {/*    <ButtonList*/}
        {/*      value={this.state.locationCharacteristics}*/}
        {/*      list={['Forest', 'Wetland', 'Field', 'Roadside, urban, suburban, or park']}*/}
        {/*      onChange={locationCharacteristics => this._update('locationCharacteristics', locationCharacteristics)}/>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="column is-6">*/}
        {/*  <div className="field">*/}
        {/*    <label className="label">Seeds Present</label>*/}
        {/*    <ButtonList*/}
        {/*      value={this.state.seedsBinary}*/}
        {/*      list={[*/}
        {/*        'Yes',*/}
        {/*        'No'*/}
        {/*      ]}*/}
        {/*      onChange={seedsBinary => this._update('seedsBinary', seedsBinary)}/>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="column is-6">*/}
        {/*  <div className="field">*/}
        {/*    <label className="label">Flowers Present</label>*/}
        {/*    <ButtonList*/}
        {/*      value={this.state.flowersBinary}*/}
        {/*      list={[*/}
        {/*        'Yes',*/}
        {/*        'No'*/}
        {/*      ]}*/}
        {/*      onChange={flowersBinary => this._update('flowersBinary', flowersBinary)}/>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="column is-6">
          <div className="field">
            <label className="label">Ash Borer</label>
            <ButtonList
              value={this.state.emeraldAshBorer}
              list={[
                'D-shaped adult exit holes',
                'Bark coming off with tunneling underneath',
                'Bark splitting',
                'Emerald ash borer beetles/larvae',
                'Stump sprouting or epicormic growth'
              ]}
              onChange={emeraldAshBorer => this._update('emeraldAshBorer', emeraldAshBorer)}/>
          </div>
        </div>

        {/*<div className="column is-6">*/}
        {/*  <div className="field">*/}
        {/*    <label className="label">Crown Health</label>*/}
        {/*    <ButtonList*/}
        {/*      value={this.state.crownHealth}*/}
        {/*      list={[*/}
        {/*        '1 - Healthy',*/}
        {/*        '2 - Thinning',*/}
        {/*        '3 - Some dead branches (less than 50%)',*/}
        {/*        '4 - Many dead branches (more than 50%)',*/}
        {/*        '5 - Completely dead',*/}
        {/*        'I\'m not sure'*/}
        {/*      ]}*/}
        {/*      onChange={crownHealth => this._update('crownHealth', crownHealth)}/>*/}
        {/*  </div>*/}
        {/*</div>*/}

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
                           value={this.state.ashDiameterNumericMin}
                           onChange={({target}) => this._update('ashDiameterNumericMin', target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Max."
                           value={this.state.ashDiameterNumericMax}
                           onChange={({target}) => this._update('ashDiameterNumericMax', target.value)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*{['Other Research Project', 'Personal Use'].includes(this.state.collectionPurpose) ?*/}
        {/*<div className="column is-6">*/}
        {/*  <div className="field">*/}
        {/*    <label className="label">Trees Nearby (only in 'Other Research Project' and 'Personal Use'</label>*/}
        {/*    <ButtonList*/}
        {/*      value={this.state.nearbyTrees}*/}
        {/*      list={[*/}
        {/*        'Dead and/or dying',*/}
        {/*        'Healthy and large',*/}
        {/*        'Healthy and small',*/}
        {/*        'No trees of this species nearby',*/}
        {/*        'Not sure'*/}
        {/*      ]}*/}
        {/*      onChange={nearbyTrees => this._update('nearbyTrees', nearbyTrees)}/>*/}
        {/*  </div>*/}
        {/*</div> : null}*/}
      </div>
    )
  }
}

AshFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
