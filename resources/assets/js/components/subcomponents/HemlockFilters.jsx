import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class HemlockFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      lingeringWoollyAdesCoverage     : [],
      elongateHemlockScaleCoverage: [],
      hemlockCones                  : [],
      crownPosition    : [],
      hemlockLocationCharacteristics: [],
      nearbyTrees            : [],
      hemlockCrownHealth            : [],
      hemlockSpecies         : [],
      lingeringHemlock       : [],
      hemlockCollectionPurpose      : [],
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
              value={this.state.hemlockSpecies}
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
                  <label className="label">Are you looking for data from a specific research group?</label>
                  <ButtonList
                      value={this.state.hemlockCollectionPurpose}
                      list={[
                          'Lingering hemlock(s) data reporting',
                          'Landscape Genomics project with University of Connecticut',
                          'Adventure Scientists Hemlock Tracking',
                          'Other Research Project',
                          'Personal use'
                      ]}
                      onChange={hemlockCollectionPurpose => this._update('hemlockCollectionPurpose', hemlockCollectionPurpose)}/>
              </div>
          </div>

          <div className="column is-6">
              <div className="field">
                  <label className="label">Are you looking for lingering hemlocks?</label>
                  <ButtonList
                      value={this.state.lingeringHemlock}
                      list={[
                          'A single lingering hemlock, surrounded by dead or dying hemlocks',
                          'A group of lingering hemlocks, surrounded by dead or dying hemlocks',
                          'Less than 80% of surrounding hemlocks are dead and/or dying, area not yet ready for a lingering hemlock search',
                          'No hemlocks in this area because (see next step):'
                      ]}
                      onChange={lingeringHemlock => this._update('lingeringHemlock', lingeringHemlock)}/>
              </div>
          </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Hemlock Woolly Adelgids (HWA)</label>
            <ButtonList
              value={this.state.lingeringWoollyAdesCoverage}
              list={['Yes, H = Heavily infested',
                  'Yes, M = Moderately infested',
                  'Yes, L = Lightly infested',
                  'No HWA present',
                  'I\'m not sure (e.g., cannot see the branches from the ground)']}
              onChange={lingeringWoollyAdesCoverage => this._update('lingeringWoollyAdesCoverage', lingeringWoollyAdesCoverage)}/>
          </div>
        </div>

          <div className="column is-6">
              <div className="field">
                  <label className="label">Elongate Hemlock Scale (EHS)</label>
                  <ButtonList
                      value={this.state.elongateHemlockScaleCoverage}
                      list={['Yes, H = Heavily infested',
                          'Yes, M = Moderately infested',
                          'Yes, L = Lightly infested',
                          'No HWA present',
                          'I\'m not sure (e.g., cannot see the branches from the ground)']}
                      onChange={elongateHemlockScaleCoverage => this._update('elongateHemlockScaleCoverage', elongateHemlockScaleCoverage)}/>
              </div>
          </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Cones</label>
            <ButtonList
              value={this.state.hemlockCones}
              list={['Yes', 'No', 'I\'m not sure']}
                        onChange={hemlockCones => this._update('hemlockCones', hemlockCones)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Crown Position</label>
            <ButtonList
              value={this.state.crownPosition}
              list={[
                  'Dominant, this tree’s crown extends above other nearby trees',
                  'Codominant, this tree’s crown is level with or slightly below other nearby trees',
                  'Overtopped, this tree’s crown is entirely below other nearby trees',
                  'Not applicable (e.g., tree is isolated, tree is on the edge, etc)',
                  'I\'m not sure.'
              ]}
              onChange={crownPosition => this._update('crownPosition', crownPosition)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Crown Health</label>
            <ButtonList
              value={this.state.hemlockCrownHealth}
              list={[
                  'H = Healthy (>80% healthy crown; deep green, dense foliage; skylight is mostly blocked when you look at the tree)',
                  'I = In Decline (<80% - >20% healthy crown; foliage beginning to thin; foliage green-to-greyish; some skylight visible when looking at the tree)',
                  'S = Severe Decline (<20% crown; many limbs dead, foliage sparse; skylight very visible when looking at the tree)',
                  'I\'m not sure (please describe in next field)'
              ]}
              onChange={hemlockCrownHealth => this._update('hemlockCrownHealth', hemlockCrownHealth)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Habitat</label>
            <ButtonList
              value={this.state.hemlockLocationCharacteristics}
              list={[
                  'Forest',
                  'Wetland',
                  'Field',
                  'Roadside, urban, suburban, or park',
                  'Riparian area',
                  'Steep slope',
                  'South or West facing slope',
                  'Hemlock is predominant tree'
              ]}
              onChange={hemlockLocationCharacteristics => this._update('hemlockLocationCharacteristics', hemlockLocationCharacteristics)}/>
          </div>
        </div>

        {/*<div className="column is-6">*/}
        {/*  <div className="field">*/}
        {/*    <label className="label">Trees Nearby</label>*/}
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

HemlockFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
