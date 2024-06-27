import React from 'react'
import Navbar from '../components/Navbar'
import HomeJumbotron from '../components/HomeJumbotron'
import FeaturesList from '../components/FeaturesList'
import RecentUpdates from '../components/RecentUpdates'
import HomeFooter from '../components/HomeFooter'
import Leaderboard from '../components/Leaderboard'
import TwitterFeed from '../components/TwitterFeed'
import ObservationFeed from '../components/ObservationsFeed'
import Scene from './Scene'
import Dropdown from '../components/Dropdown'
import User from '../helpers/User'



export default class Welcome extends Scene {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      appNames: ['HealthyWoods', 'Eastern Forest Pests', 'Avid Deer', 'Treesnap', 'FlorestaDB'],
      appName: '',
      imagePath: '',
      description: '',
      isLoggedIn: false,
    }
    this.toggle = this.toggle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChangeAppName = this.handleChangeAppName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)

    document.title = 'TreeSnap - Help Our Nation\'s Trees!'
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
  }
   
  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    console.log(this.state.isOpen)
  }

  onSubmit(event) {
    event.preventDefault();

    axios.post('/web/treets/create', {
      app_name     : event.target.appName.value,
      image_path   : this.state.imagePath,
      description  : event.target.description.value,
    }).catch(error => {
      if (error.response) {
        console.log(error)
      }
    })
    location.reload()
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
  /**
   * Render the scene.
   *
   * @returns {XML}
   */
  renderAppName(appName) {
    return (
        <option className="pa-2" value={appName}>{appName}</option>
    
    )
  }
  render() {
    return (
      <div>
        <div className="home">
          <Navbar home={true}/>
          <HomeJumbotron/>

        </div>
        <div className="home-section bg-dark">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h3 className={'title is-3 bg-dark has-text-centered mb-none'}>Leaderboard</h3>
                <p className="has-text-centered text-dark-muted mb-0">Top Submitters of All Time</p>
                <Leaderboard limit={5}/>
              </div>
              <div className="column">
                <h3 className={'title is-3 bg-dark has-text-centered mb-none'}>Observation Feed</h3>
                <p className="has-text-centered text-dark-muted mb-0">Latest Observations</p>
                <ObservationFeed/>
              </div>
              <div className="column">
                <div className="update-row">
               <h3 className={'title is-3 bg-dark has-text-centered mr-3 mb-none'}>Recent Updates</h3>
               {this.state.isLoggedIn ?

              <button type="button" onClick={this.toggle} className="button is-primary is-small"><i className="fa fa-plus"></i> &nbsp;  New Update </button>
               :null}
                </div>
               <p className="has-text-centered text-dark-muted mb-0">Latest Updates from <a target="_blank"  href="https://staton-lab-portfolio.web.app/">Staton Lab</a> </p>
               {this.state.isOpen ? 
                <form className="" onSubmit={this.onSubmit}>
                
                <div className={'item-box elevation-1 is-lighter-light'}>     
                <div className="recent-updates-form">
                  <div className="field">

                  <label for="appName" className="label">App Name</label>
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
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                            className="input textarea-height"
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
               
               <TwitterFeed/>
              </div>
            </div>
            </div>
            
        </div>
        <FeaturesList/>
        <HomeFooter/>
      </div>
    )
  }
}
