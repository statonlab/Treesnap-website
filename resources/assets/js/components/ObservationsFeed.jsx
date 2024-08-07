import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';


export default class ObservationsFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      observations: [],
      moreObservations: [],
      loading     : true,
      page: 1,
      lastPage: 0,
      endOfFeed: false
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMoreObservations = this.loadMoreObservations.bind(this);
    this.loadObservations = this.loadObservations.bind(this);
  }

  componentDidMount() {
    this.loadObservations()

  }

  loadObservations() {
    axios.get(`/web/observations/feed/`,{
      params:{
        page: this.state.page
      }
    })
    .then(response => {
      // this.setState({observations: response.data.data, loading: false})
      this.setState({observations: response.data.data })
      this.setState({lastPage: response.data['last_page']})
      this.setState({loading: false})

    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }  

  loadMoreObservations(skip) {
    axios.get(`/web/observations/feed/`,{
      params:{
        page: this.state.page
      }
    })
    .then(response => {
      // this.setState({observations: response.data.data, loading: false})
      this.setState({observations: [...this.state.observations, ...response.data.data] })
      this.setState({loading: false})     

    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }

  handleScroll(event){
      const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
      if (bottom && (this.state.loading==false)) {
        if(this.state.page === (this.state.lastPage+1)){
          this.setState({endOfFeed: true})

        }
        else{

          this.setState({loading: true})
          this.setState({page: this.state.page+1})
          var delayInMilliseconds = 1000;
          
          setTimeout(() => {
            this.loadMoreObservations();
          }, 1000);
        }
      }
    }

  renderObservation(observation) {
    return (
      <div key={observation.id}
           className={'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center'}>
        <div className="is-flex flex-v-center flex-wrap">
          <div className="item mr-1">
            <Link to={`observation/${observation.id}`}>
              <img src={observation.thumbnail}
                   alt={`${observation.observation_category} by ${observation.user.name}`}
                   className="item-thumbnail img-circle elevation-1"
                   style={{marginTop: 8}}/>
            </Link>
          </div>
          <div className="item">
            <Link to={`observation/${observation.id}`}><strong>{observation.observation_category}</strong></Link>
            <div className="text-dark-muted">Submitted by {observation.user.name}</div>
            <div className="text-dark-muted">{observation.date}</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{maxHeight: 487, overflowY: 'auto'}} onScroll={this.handleScroll}>
        {this.state.observations.map(this.renderObservation.bind(this))}
        {this.state.observations.length === 0 && !this.state.loading ?
          <p className="text-dark-muted has-text-centered">There are no observations at this time</p>
          : null}
          {this.state.endOfFeed ?
          <p className="text-dark-muted has-text-centered">End of Feed</p>
          : null}
          {this.state.loading ?
            <p className="has-text-centered">
              <i className="fa fa-spinner fa-spin"></i>
            </p>
            : null}
      </div>
    )
  }
}
