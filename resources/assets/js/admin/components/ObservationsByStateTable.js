import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class ObservationsByStateTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: {}
    }
  }

  componentDidMount() {
    let limit = this.props.limit || null
    axios.get(`/admin/web/analytics/observations/states/${limit}`).then(response => {
      let rows = response.data.data
      this.setState({
        rows
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    let {rows} = this.state
    let keys   = Object.keys(rows)

    if (keys.length === 0) {
      return null
    }

    return (
      <table className="table">
        <thead>
        <tr>
          <th>State</th>
          <th className="has-text-right">Number of Observations Reported</th>
        </tr>
        </thead>
        <tbody>
        {keys.map(key => {
          return (
            <tr key={key}>
              <th>{key}</th>
              <td className="has-text-right">{rows[key]}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

ObservationsByStateTable.propTypes = {
  limit: PropTypes.number
}

ObservationsByStateTable.defaultProps = {
  limit: 10
}
