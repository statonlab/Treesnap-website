import React, { Component } from 'react'
import Scene from './Scene'
import AccountView from '../components/AccountView'
import BoxModal from '../components/BoxModal'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class ScientificSamplingScene extends Scene {
  constructor(props) {
    super(props)
    this.state = {
      showFormModal         : false,
      hasPublicCoordinates  : false,
      name                  : '',
      traits                : [''],
      loading               : false,
      projects              : [],
    }
  }

  componentDidMount() {
    this.loadProjects()
  }

  loadProjects() {
    this.setState({loading: true})
    axios.get('/web/sampling-project').then(response => {
      let data = response.data.data
      this.setState({projects : data})
    }).catch(error => {
      console.log(error)
    })
    this.setState({loading: false})
  }

  createSamplingProject() {
    axios.post(`/web/sampling-project`, {
      has_public_coordinates  : this.state.hasPublicCoordinates,
      name                    : this.state.name,
      traits                  : this.state.traits,
    }).then(() => {
      this.loadProjects()
    }).then(() => {
      this.setState({
        showFormModal: false,
      })
    })
  }

  _renderProjectsTable() {
    return (
      <table className="table is-striped mb-none" id="groups-table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Participants</th>
          <th>Leader</th>
          <th>Date Created</th>
        </tr>
        </thead>
        <tbody>
        {this.state.projects.map((project, index) => {
          return (
            <tr key={index}>
              <td>
                <Link to={`/scientific-sampling/${project.id}`}>
                  <span>{project.name}</span>
                </Link>
              </td>
              <td>{project.users_count}</td>
              <td>{project.owner.name}</td>
              <td>{moment(project.created_at).format('MMM Do, YYYY')}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }

  _renderFormModal() {
    return (
      <div>
        <h1 className="title is-4">Create Scientific Sampling Project</h1>
        <form action="#" onSubmit={() => this.createSamplingProject().bind(this)}>
          <div className="field">
            <div className="control">
              <label className="checkbox">
              <input type="checkbox"
                     className="mr-0"
                     value={0}
                     onChange={({target}) => this.setState({hasPublicCoordinates: target.checked})}/>
                     <span>Uses Public Coordinates?</span>
              </label>
            </div>
          </div>

          <div className="field">
            <label className="label">Name</label>
            <input type="text"
                   className="input limit-width"
                   onChange={(e) => this.setState({name: e.target.value})}/>
          </div>

          {this.state.traits.map((value, index) => {
              return (
                <div className="field">
                  <div className="field">
                    <label className="label">Traits</label>
                    <textarea className="textarea"
                              onChange={(e) => this.handleChange(e.target.value, index)}/>
                  </div>
                </div>
              )
            })}

          <div className="field">
            <button type="button"
                    className="button is-link"
                    onClick={() => this.setState({traits: [...this.state.traits, '']})}>
              Add Trait
            </button>
          </div>

          <button type="submit" className="button is-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }

  handleChange(value, index) {
    let traits = [...this.state.traits];
    traits[index] = value;
    this.setState({traits});
  }

  render() {
    return (
      <AccountView>
        <h3 className="title is-3">Scientific Sampling</h3>
        <div className="box">
          <button className="button is-primary mb-1"
                  onClick={() => this.setState({showFormModal: true})}>
            <span>Start a Scientific Sampling Project</span>
          </button>
          {this._renderProjectsTable()}
        </div>

        <BoxModal visible={this.state.showFormModal}
                  onCloseRequest={() => this.setState({showFormModal: false})}>
          {this._renderFormModal()}
        </BoxModal>
      </AccountView>
    )
  }
}