import React, {Component} from 'react'

export default class GroupSearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      groups    : []
    }
  }

  componentWillMount() {
    this.search()
  }

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

  render() {
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

        <table className="table has-text-vertically-centered mb-none">
          <tbody>
          {this.state.groups.length === 0 && this.state.searchTerm.length > 0 ?
            <tr>
              <td colSpan={3} className="has-text-grey">
                No results found
              </td>
            </tr>
            : null}

          {this.state.groups.map(group => {
            return (
              <tr key={group.id}>
                <td>
                  {group.name}
                </td>
                <td>
                  {group.users_count} Members
                </td>
                <td className="has-text-right">
                  <button type="button" className="button is-small is-outlined is-success">
                    Join
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}