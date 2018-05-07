import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class OtherFilters extends Component {
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
                     onChange={label => this._update('otherLabel', label)}
                     placeholder="E.g, Silver Maple"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OtherFilters.PropTypes = {
  onChange: PropTypes.func.isRequired
}
