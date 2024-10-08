import React, { Component } from 'react'

export default class Treet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      isLoggedIn: false,
      isAdmin: false,
      isEditing: false,
      appNames: ['HealthyWoods', 'Eastern Forest Pests', 'Avid Deer', 'Treesnap', 'FlorestaDB'],
      appName: '',
      imagePath: this.props.treet.image_path,
      description: this.props.treet.description,
      currentAppName: this.props.treet.app_name,
    }
    this.toggle = this.toggle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderAppName = this.renderAppName.bind(this)
    this.handleChangeAppName = this.handleChangeAppName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)


  }
  componentDidMount() {
    axios.get('/web/user/status').then(response => {
      let data = response.data.data
      this.setState({
        isLoggedIn: data.logged_in,
      })
      if(data.is_admin){
        this.setState({
          isAdmin: data.is_admin,
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.editTreet(this.props.treet.id,event.target.appName.value,this.state.imagePath,event.target.description.value)

    this.toggle()
  }
  handleChangeAppName(event) {
    this.setState({appName: event.target.value});
    if(event.target.value == "Treesnap"){
      this.setState({imagePath: "../images/logos/treesnap_logo.png"});
    }
    else if(event.target.value == "FlorestaDB"){
      this.setState({imagePath: "../images/logos/florestadb_logo.png"});
    }
    else if(event.target.value == "HealthyWoods"){
      this.setState({imagePath: "../images/logos/healthywoods_logo.png"});
    }
    else if(event.target.value == "Avid Deer"){
      this.setState({imagePath: "../images/logos/aviddeer_logo.png"});
    }
    else if(event.target.value == "Eastern Forest Pests"){
      this.setState({imagePath: "../images/logos/efp_logo.png"});
    }
  }
  handleChangeDescription(event) {
    this.setState({description: event.target.value});
  }
  toggle() {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }
  renderAppName(appName) {
    return <option className="pa-2" key={appName} value={appName}>{appName}</option>
  }
  render() {
    const treet = this.props.treet
    return (
      <div className={'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center'}>
        <div className="is-flex flex-v-center flex-column-left flex-wrap w-100">

            {this.state.isEditing ?
            <>
            <form className="w-100" onSubmit={this.onSubmit} id="edit-form">

        <div className={'item-box'}>
        <div className="recent-updates-form">
          <div className="field">

          <label htmlFor="appName" className="label text-white">App Name</label>
            <div className="control ">
                <span className="select w-100">
                    <select type="select"
                      name="appName"
                      className="w-100"
                      id="appName-dropdown"
                      defaultValue={treet.app_name}
                      onChange={this.handleChangeAppName}
                    >
                      {this.state.appNames.map((appName)=>(this.renderAppName(appName)))}


                    </select>
                </span>
            </div>
            </div>
          <div className="field mt-1 mb-2">
            <label className="label text-white">Description</label>
            <div className="control">
              <textarea
                    className="input textarea-height-8em"
                    name="description"
                    defaultValue={treet.description}
                    onChange={this.handleChangeDescription}>
              </textarea>
            </div>
          </div>
          </div>
        </div>
       </form>
        <div className="edit">
        <button className="button is-primary is-small mr-3" type="submit" form="edit-form">Submit</button>
        <button className="button is-danger is-small mr-3" onClick={()=>this.toggle()}>Cancel</button>
        </div>
        </>
       :
            <>

            <div className="flex-row flex-space-between w-100">
              <div className="flex-row">
                <div className="item mr-2">
                  <a href={treet.url} target="_blank">
                    <img src={treet.image_path}
                        alt={treet.app_name}
                        className="item-thumbnail "/>
                  </a>
                </div>

                <div className="item">
                  <div className="text-dark-muted text-wrap"><strong>{treet.app_name}</strong></div>
                </div>
              </div>
              <div className="item">
                <div className="text-dark-muted text-wrap">{treet.date}</div>
              </div>


            </div> {/* end of row */}

            <div className="item">
              <div className="text-dark-muted text-wrap w-100">{treet.description}</div>
            </div>
            {(this.state.isLoggedIn && this.state.isAdmin) ?
            <div className="edit">
            <button className="button is-primary is-small mr-3" onClick={()=>this.toggle()}>Edit</button>
            <button className="button is-danger is-small" onClick={()=>this.props.deleteTreet(treet)}>Delete</button>
            </div>
            :null}
            </>
            }



        </div>
      </div>
    )
  }
}
