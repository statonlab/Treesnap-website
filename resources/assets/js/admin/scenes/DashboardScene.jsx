import React, {Component} from 'react'
import InfoBox from '../components/InfoBox'
import DoughnutChart from '../components/DoughnutChart'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'

export default class DashboardScene extends Component {

    render() {
        return (
            <div>
                <h1 className="title is-3">Dashboard</h1>

                <div className="columns is-desktop">
                    <div className="column">
                        <InfoBox title="Registered Users" icon="fa-users" url="/admin/api/analytics/users/count"/>
                    </div>
                    <div className="column">
                        <InfoBox title="Recorded Observations" icon="fa-users" url="/admin/api/analytics/observations/count"/>
                    </div>
                    <div className="column">
                        <InfoBox title="Trained Users" icon="fa-users" url="/admin/api/analytics/users/trained/percentage"/>
                    </div>
                </div>

                <div className="columns is-desktop">
                    <div className="column is-6-desktop">
                        <div className="box is-full-height">
                            <h4 className="title is-5">Observations Distribution</h4>
                            <DoughnutChart url="/admin/api/analytics/observations/distribution"/>
                        </div>
                    </div>
                    <div className="column is-6-desktop">
                        <div className="box is-full-height">
                            <h4 className="title is-5">Users</h4>
                            <LineChart/>
                        </div>
                    </div>
                </div>

                <div className="columns is-desktop">
                    <div className="column is-6-desktop">
                        <div className="box is-full-height">
                            <h4 className="title is-5">Observations by Season</h4>
                            <BarChart/>
                        </div>
                    </div>
                    <div className="column is-6-desktop">
                        <div className="box is-full-height">
                            <h4 className="title is-5">Observations by State</h4>
                            <table className="table mb-none">
                                <thead>
                                <tr>
                                    <th>State</th>
                                    <th className="has-text-right"># of Observations Reported</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>Tennessee</th>
                                    <td className="has-text-right">276</td>
                                </tr>
                                <tr>
                                    <th>Kentucky</th>
                                    <td className="has-text-right">135</td>
                                </tr>
                                <tr>
                                    <th>New York</th>
                                    <td className="has-text-right">96</td>
                                </tr>
                                <tr>
                                    <th>California</th>
                                    <td className="has-text-right">73</td>
                                </tr>
                                <tr>
                                    <th>Texas</th>
                                    <td className="has-text-right">28</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}