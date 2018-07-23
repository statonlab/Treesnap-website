import React, {Component} from 'react'
import ObservationsByStateTable from '../components/ObservationsByStateTable'
import Scene from '../../scenes/Scene'

export default class ObservationsByStateScene extends Scene {
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
