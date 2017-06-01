import React, {Component} from 'react'
import Spinner from '../../components/Spinner'

export default class Observations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    /**
     * Get groups from server.
     */
    componentWillMount() {
    }

    render() {
        return (
            null
        )
    }
}