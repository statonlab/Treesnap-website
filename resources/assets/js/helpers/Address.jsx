import React, {Component} from 'react'
import GeoCoder from './GeoCoder'
import PropTypes from 'prop-types'

export default class Address extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: []
    }
  }

  componentDidMount() {
    let lat = this.props.position.latitude
    let lng = this.props.position.longitude

    GeoCoder.geocode({location: {lat, lng}}, (results, status) => {
      if (status === 'OK' && results[0]) {
        let full_address = results[0].formatted_address.split(',')
        let address      = [full_address.shift(), full_address.join(',')]
        this.setState({address})
      }
    })
  }

  render() {
    return (
      <div className="mb-0">
        {this.state.address.map((part, index) => {
          return (
            <div key={index}>
              {part}
            </div>
          )
        })}
      </div>
    )
  }
}

Address.propTypes = {
  position: PropTypes.object.isRequired
}
