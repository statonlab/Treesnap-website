import React, {Component} from 'react'
import Notify from '../../components/Notify'
import Spinner from '../../components/Spinner'
import Scene from '../../scenes/Scene'

export default class NotificationsScene extends Scene {
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
      this.setState({loading: false})
      alert('Error occurred while loading your settings. Please refresh the page to try again.')
      console.error(error)
    })
  }

  toggle(user, topic) {
    this.setState({toggling: true})

    axios.post('/admin/web/notifications/toggle', {
      user_id : user.id,
      topic_id: topic.id
    }).then(response => {
      let {users, topics} = response.data.data
      this.setState({
        users,
        topics,
        toggling: false
      })
      Notify.push('Subscription updated successfully', 'success')
    }).catch(error => {
      this.setState({toggling: false})
      alert('An error occurred while processing your request. Refresh the page to try again. See console for errors.')
      console.error(error)
    })
  }

  renderRow(user) {
    return (
      <tr key={user.id}>
        <td>
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>
        </td>
        <td>{this.state.topics.map((topic, index) => {
          return (
            <div key={index} className={'checkbox'}>
              <input type="checkbox"
                     value={true}
                     disabled={this.state.toggling}
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
        <Spinner visible={this.state.loading}/>
      </div>
    )
  }
}
