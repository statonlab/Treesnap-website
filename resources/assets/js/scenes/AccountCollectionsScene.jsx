import React, {Component} from 'react'
import CollectionsScene from './CollectionsScene'
import AccountView from '../components/AccountView'

export default class AccountCollectionsScene extends Component {
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