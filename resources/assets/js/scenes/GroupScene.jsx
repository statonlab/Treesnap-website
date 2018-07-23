import React, {Component} from 'react'
import Group from '../components/Group'
import AccountView from '../components/AccountView'
import Scene from './Scene'

export default class GroupScene extends Scene {
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
