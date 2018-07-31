import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Notify from './Notify'

export default class GroupJoinRequests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      requests  : [],
      processing: []
    }
  }

  /**
   * Get join requests.
   */
  componentDidMount() {
    axios.get(`/web/group/${this.props.groupID}/requests`).then(response => {
      this.setState({
        requests: response.data.data.map(request => {
          return {
            ...request,
            rejected: false
          }
        })
      })
    }).catch(error => {

    })
  }

  /**
   * Accept a request.
   *
   * @param request
   * @param notify
   * @return {Promise<void>}
   */
  async accept(request, notify = true) {
    this.setState({
      processing: this.state.processing.concat(request.id)
    })

    try {
      let response = await axios.post(`/web/group/${this.props.groupID}/request/accept`, {
        request_id: request.id
      })

      this.setState({
        requests  : this.state.requests.filter(r => r.id !== request.id),
        processing: this.state.processing.filter(id => id !== request.id)
      })

      if (notify) {
        Notify.push(`Accepted ${request.user.name}'s request to join this group`)
        this.props.onAccept()
      }
    } catch (error) {
      if (notify) {
        Notify.push('We encountered and error while processing your request. Please try again later', 'danger')
        return
      }

      throw new Error(error.response.status)
    }
  }

  /**
   * Reject a request.
   *
   * @param request
   */
  reject(request) {
    this.setState({
      processing: this.state.processing.concat(request.id)
    })

    axios.post(`/web/group/${this.props.groupID}/request/reject`, {
      request_id: request.id
    }).then(response => {
      this.setState({
        requests  : this.state.requests.map(r => {
          if (r.id === request.id) {
            r.rejected = true
          }

          return r
        }),
        processing: this.state.processing.filter(id => id !== request.id)
      })

      Notify.push(`Rejected ${request.user.name}'s request to join this group`, 'warning')
    }).catch(error => {
      Notify.push('We encountered and error while processing your request. Please try again later', 'danger')
    })
  }

  /**
   * Accept all requests that have not been rejected.
   */
  async acceptAll() {
    let requests = this.state.requests

    for (let id in requests) {
      let request = requests[id]

      if (typeof request === 'undefined' || typeof request.id === 'undefined') {
        continue
      }

      if (request.rejected) {
        continue
      }

      try {
        await this.accept(request, false)
      } catch (error) {
        Notify.push(`Unable to accept ${request.user.name} at this time, please try again later`, 'danger')
      }
    }

    Notify.push('Accepted all requests')
    this.props.onAccept()
  }

  undo(request) {
    this.setState({
      processing: this.state.processing.concat(request.id)
    })

    axios.post(`/web/group/${this.props.groupID}/request/reset`, {
      request_id: request.id
    }).then(response => {
      this.setState({
        requests  : this.state.requests.map(r => {
          if (r.id === request.id) {
            r.rejected = false
          }

          return r
        }),
        processing: this.state.processing.filter(id => id !== request.id)
      })
    }).catch(error => {
      Notify.push('We encountered and error while processing your request. Please try again later', 'danger')
    })
  }

  /**
   * Render request rows.
   *
   * @return {any[]}
   * @private
   */
  _renderRows() {
    return this.state.requests.map(request => {
      return (
        <tr key={request.id}>
          <td>{request.user.name}</td>
          <td>{request.created_at}</td>
          <td className="has-text-right">
            {this._renderActionButtons(request)}
          </td>
        </tr>
      )
    })
  }

  /**
   * Render action buttons in a row.
   *
   * @param request
   * @return {*}
   * @private
   */
  _renderActionButtons(request) {
    if (this.state.processing.indexOf(request.id) !== -1) {
      return (
        <button type="button" className="button is-link is-loading is-small" disabled={true}></button>
      )
    }

    if (!request.rejected) {
      return (
        <div>
          <button type="button"
                  className="button is-success is-small is-outlined mr-0"
                  onClick={() => this.accept(request)}>
            <span className="icon is-small">
              <i className="fa fa-check"></i>
            </span>
            <span>Accept</span>
          </button>
          <button type="button" className="button is-danger is-small is-outlined"
                  onClick={() => this.reject(request)}>
            <span className="icon is-small">
              <i className="fa fa-times"></i>
            </span>
            <span>Reject</span>
          </button>
        </div>
      )
    }

    return (
      <button type="button"
              className="button is-link is-small"
              onClick={() => this.undo(request)}>
        <span>Undo Rejection</span>
      </button>
    )
  }

  render() {
    if (this.state.requests.length <= 0) {
      return null
    }

    return (
      <div className="box">
        <h4 className="title is-4">Pending Join Requests</h4>
        <table className="table is-striped">
          <thead>
          <tr>
            <th>User Name</th>
            <th>Request Date</th>
            <th className="has-text-right">Action</th>
          </tr>
          </thead>
          <tbody>
          {this._renderRows()}
          </tbody>
        </table>

        <div className="has-text-right">
          <button type="button" className="button is-primary" onClick={this.acceptAll.bind(this)}>Accept All</button>
        </div>
      </div>
    )
  }
}

GroupJoinRequests.propTypes = {
  groupID : PropTypes.number.isRequired,
  onAccept: PropTypes.func
}

GroupJoinRequests.defaultProps = {
  onAccept() {
  }
}
