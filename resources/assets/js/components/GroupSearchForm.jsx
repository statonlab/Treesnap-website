import React, {Component} from 'react'
import Notify from './Notify'

export default class GroupSearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm  : '',
      groups      : [],
      loading     : false,
      joiningGroup: -1,
      seeMore     : false
    }
  }

  /**
   * Perform an initial search
   */
  componentWillMount() {
    this.search()
  }

  /**
   * Perform the search and set the results.
   *
   * @param searchTerm
   */
  search(searchTerm) {
    if (typeof searchTerm !== 'undefined') {
      this.setState({searchTerm})
    } else {
      searchTerm = ''
    }

    axios.get('/web/groups/search', {
      params: {
        term: searchTerm
      }
    }).then(response => {
      this.setState({groups: response.data.data})
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Toggle joining status.
   *
   * @param group
   */
  join(group) {
    // Prevent multiple requests
    if (this.state.joiningGroup !== -1) {
      return
    }

    this.setState({
      joiningGroup: group.id,
      loading     : true
    })

    axios.post(`/web/groups/join/${group.id}`).then(response => {
      Notify.push(response.data.data)

      this.setState({
        joiningGroup: -1,
        loading     : false
      })

      this.search(this.state.searchTerm)
    }).catch(error => {
      this.setState({
        joiningGroup: -1,
        loading     : false
      })

      if (!error.response) {
        Notify.push('Network error! Please try again later', 'danger')
        return
      }

      let response = error.response

      switch (response.status) {
        case 404:
          Notify.push('Unknown group selected! Please select a valid group', 'danger')
          break
        case 422:
          if (response.data.error) {
            Notify.push(response.data.error, 'danger')
          } else {
            Notify.push('Unknown error! Please try again later', 'danger')
          }
          break
        default:
          Notify.push('Internal server error! Please try again later', 'danger')
      }
    })
  }

  render() {
    let groups = this.state.seeMore ? this.state.groups : this.state.groups.slice(0, 4)
    return (
      <div>
        <div className="field mb-1">
          <div className="control">
            <input type="search"
                   className="input"
                   placeholder="Type to search..."
                   onChange={({target}) => this.search(target.value)}
                   value={this.state.searchTerm}/>
          </div>
        </div>

        <table className="table has-text-vertically-centered">
          <tbody>
          {groups.length === 0 && this.state.searchTerm.length > 0 ?
            <tr>
              <td colSpan={3} className="has-text-grey">
                No results found
              </td>
            </tr>
            : null}

          {groups.map(group => {
            let classes = this.state.joiningGroup === group.id ? ' is-loading' : ' is-outlined'
            classes += group.has_request ? ' is-warning' : ' is-success'
            return (
              <tr key={group.id}>
                <td>
                  {group.name}
                </td>
                <td>
                  {group.users_count} Members
                </td>
                <td className="has-text-right">
                  <button type="button"
                          className={`button is-small${classes}`}
                          disabled={this.state.loading && this.state.joiningGroup !== group.id}
                          onClick={() => this.join(group)}>
                    {!group.has_request ? 'Join' : 'Pending'}
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
        {this.state.groups.length > 4 ?
          <a href="javascript:;"
             className="is-block has-text-centered"
             onClick={() => this.setState({seeMore: !this.state.seeMore})}>
            {this.state.seeMore ? 'See Less' : 'See More'}
          </a>
          : null}
      </div>
    )
  }
}