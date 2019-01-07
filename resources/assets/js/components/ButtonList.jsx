import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ButtonList extends Component {
  constructor(props) {
    super(props)
  }

  _setActiveSelected(item) {
    return this.props.value.indexOf(item) > -1 ? ' is-selected' : ''
  }

  _toggleSelected(item) {
    let selected = []
    if (this.props.value.indexOf(item) > -1) {
      selected = this.props.value.filter(term => {
        return term !== item
      })
    } else {
      selected = this.props.value.concat(item)
    }

    console.log(selected)

    this.props.onChange(selected)
  }

  render() {
    return (
      <div className="control buttons-group">
        {this.props.list.map((item, index) => {
          return (
            <button type="button"
                    className={`button mb-0 button-select${this._setActiveSelected(item)}`}
                    key={index}
                    onClick={() => this._toggleSelected(item)}>
              <span className="icon is-small">
                <i className="fa fa-check"></i>
              </span>
              <span>{item}</span>
            </button>
          )
        })}
      </div>
    )
  }
}

ButtonList.propTypes = {
  list    : PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value   : PropTypes.array.isRequired
}
