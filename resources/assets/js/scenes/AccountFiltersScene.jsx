import React, {Component} from 'react'
import FiltersScene from './FiltersScene'
import AccountView from '../components/AccountView'

export default class AccountFiltersScene extends Component {
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