import React, {Component} from 'react'
import ObservationsByStateTable from '../components/ObservationsByStateTable'

export default class ObservationsByStateScene extends Component {
  render() {
    return (
      <div>
        <h1 className="title is-3">Observations By State</h1>
        <div className="box">
          <ObservationsByStateTable limit={100}/>
        </div>
      </div>
    )
  }
}
