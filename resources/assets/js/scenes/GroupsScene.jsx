import React, {Component} from 'react'
import Groups from '../components/Groups'
import AccountView from '../components/AccountView'

export default class GroupsScene extends Component {
  componentDidMount() {
    window.fixHeight()
  }

  render() {
    return (
      <AccountView>
        <Groups admin={false} {...this.props}/>
      </AccountView>
    )
  }
}