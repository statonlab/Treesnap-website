import React, {Component} from 'react'
import FiltersScene from './FiltersScene'
import AccountView from '../components/AccountView'
import Scene from './Scene'

export default class AccountFiltersScene extends Scene {
  componentDidMount() {
    window.fixHeight()
  }

  render() {
    return (
      <AccountView>
        <FiltersScene/>
      </AccountView>
    )
  }
}
