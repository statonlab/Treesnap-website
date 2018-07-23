import React, {Component} from 'react'
import CollectionsScene from './CollectionsScene'
import AccountView from '../components/AccountView'
import Scene from './Scene'

export default class AccountCollectionsScene extends Scene {
  componentDidMount() {
    window.fixHeight()
  }

  render() {
    return (
      <AccountView>
        <CollectionsScene/>
      </AccountView>
    )
  }
}
