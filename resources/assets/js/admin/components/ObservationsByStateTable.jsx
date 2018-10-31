import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/Spinner'

export default class ObservationsByStateTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows   : {},
      loading: true
    }
  }

  componentDidMount() {
    let limit = this.props.limit || null
    axios.get(`/admin/web/analytics/observations/states/${limit}`).then(response => {
      let rows = response.data.data
      this.setState({
        rows,
        loading: false
      })
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  render() {
    let {rows} = this.state
    let keys   = Object.keys(rows)



    if (this.state.loading) {
      return (<Spinner visible={this.state.loading} inline={true}/>)
    }

    if (keys.length === 0) {
      return (<p>No results found</p>)
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
