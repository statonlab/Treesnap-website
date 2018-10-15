import React from 'react'
import PropTypes from 'prop-types'

export default class Livefeed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: true
    }

    this.loadUsers()
  }

  loadUsers() {
    axios.get(`/web/leaderboard/${this.props.limit}`).then(response => {
      this.setState({leaders: response.data.data, loading: false})
    }).catch(error => {
      this.setSTate({loading: false})
      console.log(error)
    })
  }

  renderLeader(leader, key) {
    const num = key + 1
    return (
      <div key={key} className={'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center'}>
        <div className="is-flex flex-v-center">
          {leader.thumbnail.src.length > 0 ?
            <div className="item mr-1">
              <img src={leader.thumbnail.src}
                   alt={leader.thumbnail.alt}
                   className="item-thumbnail img-circle elevation-1"
                   style={{marginTop: 8}}/>
            </div>
            : null}
          <div className="item">
            <strong>{leader.name}</strong>
            <div className="text-dark-muted">Submitted {leader.observations_count} observations</div>
          </div>
        </div>
        <div className={`hexagon ${this.getColorClass(num)}`}>
          <span className={'is-block has-text-centered'}>
            <b>{num}</b>
            <small>{this.getOrdinalUnit(num)}</small>
          </span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <p className="has-text-centered">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
          : null}
        {this.state.leaders.map(this.renderLeader.bind(this))}
      </div>
    )
  }
}

Leaderboard.propTypes = {
  limit: PropTypes.number
}

Leaderboard.defaultProps = {
  limit: 10
}
