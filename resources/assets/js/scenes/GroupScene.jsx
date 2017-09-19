import React, {Component} from 'react'
import Group from '../components/Group'
import AccountView from '../components/AccountView'

export default class GroupScene extends Component {
  componentDidMount() {
    window.fixHeight()
  }

  render() {
    return (
      <AccountView>
        <Group admin={false} {...this.props}/>
      </AccountView>
    )
  }
}