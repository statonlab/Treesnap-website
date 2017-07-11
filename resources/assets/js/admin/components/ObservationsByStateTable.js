import React, {Component} from 'react'

export default class ObservationsByStateTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: {}
        }
    }

    componentWillMount() {
        axios.get('/admin/web/analytics/observations/states').then(response => {
            this.setState({
                rows: response.data.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        let rows = this.state.rows
        let keys = Object.keys(rows)

        if (keys.length === 0) {
            return null
        }

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>State</th>
                    <th className="has-text-right"># of Observations Reported</th>
                </tr>
                </thead>
                <tbody>
                {keys.map(key => {
                    return (
                        <tr key={key}>
                            <th>{key}</th>
                            <td className="has-text-right">{rows[key]}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}