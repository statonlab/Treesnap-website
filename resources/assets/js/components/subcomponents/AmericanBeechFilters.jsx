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
      </div>
    )
  }
}

AmericanBeechFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
