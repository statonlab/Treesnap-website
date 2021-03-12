import React, { Component } from 'react'
import Scene from './Scene'
import AccountView from '../components/AccountView'

export default class SamplingProjectScene extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      project: null,
      loading: false,
      participant: '',
    }
  }

  componentDidMount() {
    this.loadProject()
  }

  loadProject() {
    let id = this.props.match.params.id

    this.setState({loading: true})

    axios.get(`/web/sampling-project/${id}`).then(response => {
      let data = response.data.data
      this.setState({
        loading: false,
        project: data
      })
    })
  }

  addParticipant() {

  }

  render() {
    if (this.state.project === null) {
      return null
    }

    return (
      <AccountView>
        <h1 className="title is-4">{this.state.project.name}</h1>
        <div className="box">

          <div className="field">
            <label>Add a Participant</label>
            <input className="input mb-1"
                   onChange={(e) => {this.setState({participant: e.target.value})}}/>
            <button className="button is-primary"
                    onClick={() => this.addParticipant()}>
              <span>Add</span>
            </button>
          </div>
        </div>
      </AccountView>
    )
  }
}