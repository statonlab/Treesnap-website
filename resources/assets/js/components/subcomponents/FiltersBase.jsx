import React, {Component} from 'react'

export default class FiltersBase extends Component {
  componentDidMount() {
    this.setDefaultState(this.props)
  }

  componentWillReceiveProps(props) {
    this.setDefaultState(props)
  }

  setDefaultState(props) {
    if (props.defaultFilters) {
      let newState = {}
      Object.keys(props.defaultFilters).map(key => {
        if (typeof this.state[key] !== 'undefined') {
          if (this.state[key] !== props.defaultFilters[key]) {
            newState[key] = props.defaultFilters[key]
          }
        }
      })

      this.setState(newState)
    }
  }
}
