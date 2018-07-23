import React, {Component} from 'react'
import Groups from '../components/Groups'
import AccountView from '../components/AccountView'
import Scene from './Scene'

export default class GroupsScene extends Scene {
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
