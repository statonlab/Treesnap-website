import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'
import Utils from '../../helpers/Utils'
import FiltersBase from './FiltersBase'

export default class AlaskanWillowFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      willowHeightNumericMin      : '',
      willowHeightNumericMax      : '',
      catkins               : [],
      catkinSex             : [],
      geneticSample         : [],
      willowSpecies         : [],
      nearbyWillowSpecies   : [],
      streamEdgeDistance    : [],
      streamRunningDistance : []
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
            <label className="label">Tree Height ({Utils.unit('feet')})</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Min."
                           value={this.state.willowHeightNumericMin}
                           onChange={({target}) => this._update('willowHeightNumericMin', target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input type="number"
                           className="input"
                           placeholder="Max."
                           value={this.state.willowHeightNumericMax}
                           onChange={({target}) => this._update('willowHeightNumericMax', target.value)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Catkins</label>
            <ButtonList
              value={this.state.catkins}
              list={['Present', 'Absent', 'Unknown']}
              onChange={catkins => this._update('catkins', catkins)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Catkin Sex</label>
            <ButtonList
              value={this.state.catkinSex}
              list={['Male', 'Female', 'Unknown']}
              onChange={catkinSex => this._update('catkinSex', catkinSex)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Genetic Sample</label>
            <ButtonList
              value={this.state.geneticSample}
              list={['Yes', 'No']}
              onChange={geneticSample => this._update('geneticSample', geneticSample)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Willow Species</label>
            <ButtonList
              value={this.state.willowSpecies}
              list={['Salix alaxensis', 'Salix bebbiana', 'Salix glauca', 'Salix niphoclada', 'Salix pulchra', 'Salix richardsonii', 'Other']}
              onChange={willowSpecies => this._update('willowSpecies', willowSpecies)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Nearby Willow Species</label>
            <ButtonList
              value={this.state.nearbyWillowSpecies}
              list={['Mixed willow', 'Single willow spp.', 'Spruce', 'Birch']}
              onChange={nearbyWillowSpecies => this._update('nearbyWillowSpecies', nearbyWillowSpecies)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Distance to Stream Edge</label>
            <ButtonList
              value={this.state.streamEdgeDistance}
              list={["0m", "0-5m", "5-10m", "10-20m", ">20m or not present nearby"]}
              onChange={streamEdgeDistance => this._update('streamEdgeDistance', streamEdgeDistance)}/>
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label className="label">Distance to Running Water</label>
            <ButtonList
              value={this.state.streamRunningDistance}
              list={["0m", "0-5m", "5-10m", "10-20m", ">20m or not present nearby"]}
              onChange={streamRunningDistance => this._update('streamRunningDistance', streamRunningDistance)}/>
          </div>
        </div>
      </div>
    )
  }
}

AlaskanWillowFilters.propTypes = {
  onChange      : PropTypes.func.isRequired,
  defaultFilters: PropTypes.object
}

AlaskanWillowFilters.defaultProps = {
  defaultFilters: {}
}
