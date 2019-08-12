import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FiltersBase from './FiltersBase'

export default class OtherFilters extends FiltersBase {
  constructor(props) {
    super(props)

    this.state = {
      otherLabel: ''
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
            <label className="label">Tree Species</label>
            <div className="control">
              <input value={this.state.otherLabel}
                     className={'input'}
                     onChange={e => this._update('otherLabel', e.target.value)}
                     placeholder="E.g, Silver Maple"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OtherFilters.propTypes = {
  onChange: PropTypes.func.isRequired
}
