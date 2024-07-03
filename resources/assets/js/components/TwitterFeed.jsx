import React, { Component } from 'react'
import Treet from './Treet'

export default class TwitterFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      isLoggedIn: false,
      appNames: ['HealthyWoods', 'Eastern Forest Pests', 'Avid Deer', 'Treesnap', 'FlorestaDB'],
      appName: '',
      imagePath: '',
      description: '',
      treets:[],
      isOpen: false,


    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChangeAppName = this.handleChangeAppName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.deleteTreet = this.deleteTreet.bind(this)
    this.toggle = this.toggle.bind(this)

  }
 
  componentDidMount() {
    axios.get('/web/user/status').then(response => {
      let data = response.data.data
      this.setState({
        isLoggedIn: data.logged_in,
      })
    }).catch(error => {
      console.log(error)
    })
    this.loadTreets()
    
    setInterval(this.loadTreets.bind(this), 120000)
  }
  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }
  loadTreets() {
    axios.get(`/web/treets/feed`).then(response => {
      this.setState({treets: response.data.data, loading: false})
    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }
  deleteTreet(treet){
    axios.delete(`/web/treet/${treet.id}`).then(response => {
      this.loadTreets()
    }).catch(error => {
      console.log(error)
    })
  }

  onSubmit(event) {
    event.preventDefault();

    axios.post('/web/treets/create', {
      app_name     : event.target.appName.value,
      image_path   : this.state.imagePath,
      description  : event.target.description.value,
    }).then(response => {
      this.loadTreets()
      this.setState({appName: ''});
      this.setState({description: ''});

    }).catch(error => {
      if (error.response) {
        console.log(error)
      }
    })
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
  renderButton(isOpen) {
    let button;
    if(isOpen){
      return <button type="button" onClick={this.toggle} className="button mb-1 w-100 is-primary"><i className="fa fa-minus"></i> &nbsp;  Close </button>;
    }
    return <button type="button" onClick={this.toggle} className="button mb-1 w-100 is-primary"><i className="fa fa-plus"></i> &nbsp;  New Update </button>; 
  }

  renderAppName(appName) {
    return (
        <option className="pa-2" value={appName}>{appName}</option>
    
    )
  }

render() {
  const treetList = this.state.treets.map((treet)=>( <Treet deleteTreet={this.deleteTreet} loadTreets={this.loadTreets} treet={treet}/>))

  return (
      <div>
        {this.state.isLoggedIn ?

          this.renderButton(this.state.isOpen)
        :null}
        {this.state.isOpen ? 
        <form className="" onSubmit={this.onSubmit}>
        
        <div className={'item-box elevation-1 is-lighter-light'}>     
        <div className="recent-updates-form">
          <div className="field">
  
          <label htmlFor="appName" className="label text-white">App Name</label>
            <div className="control ">
                <span className="select w-100">
                    <select type="select"
                            name="appName"
                            className="w-100"
                            id="appName-dropdown"
                            value={this.state.appName}
                            onChange={this.handleChangeAppName}
                            >
                        <option value="">Select App</option>
                        {this.state.appNames.map(this.renderAppName.bind(this))}
  
                            
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
                cols="3"
                value={this.state.description}
                onChange={this.handleChangeDescription}
                placeholder={'Description'}>
              </textarea>
            </div>
          </div>
          <button type="submit" className="button">Submit</button>
          </div>   
        </div>
       </form>
      :null}
      <div style={{maxHeight: 487, overflowY: 'auto'}} className={'invisible-scrollbar'}>
        {this.state.loading ?
          <p className="has-text-centered">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
          : null}
         
        {treetList}
        {this.state.treets.length === 0 && !this.state.loading ?
          <p className="text-dark-muted has-text-centered">There are no treets at this time</p>
          : null}
      </div>
           
          </div>
    )
  }
}
