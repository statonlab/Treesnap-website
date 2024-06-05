import React, { Component } from 'react'

export default class TwitterFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      treets: [],
      loading     : true
    }
  }
 
  componentDidMount() {
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
  renderTreet(treet) {
    return (
      
      <div key={treet.id}
      className={'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center'}>
      <div className="is-flex flex-v-center">
          <div className="item mr-1">
              <img src={"../images/logos/treesnap_logo.png"}
                   alt="Treesnap"
                   className="item-thumbnail"
                   style={{marginTop: 8}}/>
          </div>
          <div className="item">
          <div className="text-dark-muted"><strong>{treet.app_name}</strong></div>
          <div className="text-dark-muted">{treet.title}</div>
          <div className="text-dark-muted">{treet.description}</div>
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
