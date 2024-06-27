import React, { Component } from 'react'

export default class TwitterFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      treets: [],
      loading     : true,
    }
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
      console.log('success')
      window.location.reload()
    }).catch(error => {
      console.log(error)
    })
  }
 
  renderTreet(treet) {
    return (
      
      <div key={treet.id}
      className={'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center'}>
      <div className="is-flex flex-v-center flex-column-left flex-wrap w-100">
          <div className="flex-row">

          <div className="item mr-3">
              <img src={treet.image_path}
                   alt={treet.app_name}
                   className="item-thumbnail "
                   style={{marginTop: 8}}/>
          </div>
          <div className="item">
            <div className="text-dark-muted text-wrap"><strong>{treet.app_name}</strong></div>
          </div>
          </div>
          <div className="item">

            <div className="text-dark-muted my-4 text-wrap w-100">{treet.description}</div>
            <div className="text-dark-muted text-wrap">{treet.date}</div>
          </div>
          <div className="edit">
          <button className="button is-primary is-small mr-3">Edit</button>
          <button className="button is-danger is-small" onClick={()=>this.deleteTreet(treet)}>Delete</button>
          </div>
        </div>
      </div>
    
    )
  }
  render() {
    return (
      <div style={{maxHeight: 487, overflowY: 'auto'}} className={'invisible-scrollbar'}>
        {this.state.loading ?
          <p className="has-text-centered">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
          : null}
        {this.state.treets.map(this.renderTreet.bind(this))}
        {this.state.treets.length === 0 && !this.state.loading ?
          <p className="text-dark-muted has-text-centered">There are no treets at this time</p>
          : null}
      </div>
    )
  }
}
