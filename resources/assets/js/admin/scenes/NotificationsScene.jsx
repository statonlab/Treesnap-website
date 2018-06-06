import React, {Component} from 'react'

export default class NotificationsScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users  : [],
      topics : [],
      loading: false
    }
  }

  componentDidMount() {
    this.loadSettings()
  }

  loadSettings() {
    this.setState({loading: true})

    axios.get('/admin/web/notifications').then(response => {
      let {users, topics} = response.data.data
      this.setState({
        users,
        topics,
        loading: false
      })
    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }

  toggle(user, topic) {
    this.setState({loading: true})

    axios.post('/admin/web/notifications/toggle', {
      user_id : user.id,
      topic_id: topic.id
    }).then(response => {
      let {users, topics} = response.data.data
      this.setState({
        users,
        topics,
        loading: false
      })
    }).catch(error => {
      alert('An error occurred while processing your request. Refresh the page to try again. See console for errors.')
      console.error(error)
    })
  }

  renderRow(user) {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{this.state.topics.map((topic, index) => {
          return (
            <div key={index} className={'checkbox'}>
              <input type="checkbox"
                     value={true}
                     disabled={this.state.loading}
                     onChange={({target}) => {
                       this.toggle(user, topic)
                     }}
                     checked={user.subscription_topics.map(t => t.id).indexOf(topic.id) > -1}
              /> {topic.description}
            </div>
          )
        })}</td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h1 className="title is-3">Manage Admin Notifications</h1>
        <div className="box">
          <h3 className="title is-4 mb-0">Admin Users</h3>
          <p className={'mb-0'}>Subscribe users to a topic using the checkboxes</p>
          <table className={'table table-fixed'}>
            <thead>
            <tr>
              <th>User</th>
              <th>Topics</th>
            </tr>
            </thead>
            <tbody>
            {this.state.users.map(this.renderRow.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
