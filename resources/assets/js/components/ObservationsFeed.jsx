import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class ObservationsFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      observations: [],
      loading     : true
    }
  }

  componentDidMount() {
    this.loadObservations()

    setInterval(this.loadObservations.bind(this), 120000)
  }

  loadObservations() {
    axios.get(`/web/observations/feed`).then(response => {
      this.setState({observations: response.data.data, loading: false})
    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }

  renderObservation(observation) {
    return (
      <Link to={`observation/${observation.id}`}>
        <div key={observation.id}
             className={'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center'}>
          <div className="is-flex flex-v-center">
            <div className="item mr-1">
              <img src={observation.thumbnail}
                   alt={`${observation.observation_category} by ${observation.user.name}`}
                   className="item-thumbnail img-circle elevation-1"
                   style={{marginTop: 8}}/>
            </div>
            <div className="item">
              <strong>{observation.observation_category}</strong>
              <div className="text-dark-muted">Submitted by {observation.user.name} {observation.date}</div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  render() {
    return (
      <div style={{maxHeight: 487, overflowY: 'auto'}} className={'invisible-scrollbar'}>
        {this.state.loading ?
          <p className="has-text-centered">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
          : null}
        {this.state.observations.map(this.renderObservation.bind(this))}
        {this.state.observations.length === 0 && !this.state.loading ?
          <p className="text-dark-muted has-text-centered">There are no observations at this time</p>
          : null}
      </div>
    )
  }
}

// ObservationsFeed.propTypes = {
//   limit: PropTypes.number
// }
//
// ObservationsFeed.defaultProps = {
//   limit: 3
// }
