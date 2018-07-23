import React, {Component} from 'react'
import InfoBox from '../components/InfoBox'
import DoughnutChart from '../components/DoughnutChart'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import ObservationsByStateTable from '../components/ObservationsByStateTable'
import {NavLink} from 'react-router-dom'
import Scene from '../../scenes/Scene'

export default class DashboardScene extends Scene {
  constructor(props) {
    super(props)
    document.title = 'Admin Dashboard - TreeSnap'
  }

  render() {
    return (
      <div>
        <h1 className="title is-3">Dashboard</h1>

        <div className="columns">
          <div className="column">
            <InfoBox title="Registered Users" icon="fa-users" url="/admin/web/analytics/users/count"/>
          </div>
          <div className="column">
            <InfoBox title="Recorded Observations"
                     icon="fa-users"
                     url="/admin/web/analytics/observations/count"/>
          </div>
          <div className="column">
            <InfoBox title="Trained Users"
                     icon="fa-users"
                     url="/admin/web/analytics/users/trained/percentage"/>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="box is-full-height p-0">
              <h4 className="title is-5 p-1 pt-0 pb-none">Observations Distribution</h4>
              <DoughnutChart url="/admin/web/analytics/observations/distribution"/>
            </div>
          </div>
          <div className="column">
            <div className="box is-full-height p-0">
              <h4 className="title is-5 p-1 pt-0 pb-none">User Registrations Over Time</h4>
              <LineChart/>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="box">
              <h4 className="title is-5">Observations Over Time</h4>
              <BarChart/>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <div className="is-flex flex-space-between">
                <h4 className="title is-5">Observations by State</h4>
                <NavLink to={'/observations-by-state'}>View All</NavLink>
              </div>
              <ObservationsByStateTable/>
              <p className="help">Sorted by number of observations and limited to top 10. <NavLink to={'/observations-by-state'}>View all.</NavLink></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
