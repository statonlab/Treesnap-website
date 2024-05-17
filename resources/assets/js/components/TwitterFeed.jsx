import React, { Component } from 'react'

export default class TwitterFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      treets: [],
      loading     : true
    }
  }
  // componentDidMount() {
  //   this.loadTreets()

  //   setInterval(this.loadTreets.bind(this), 120000)
  // }

  // loadTreets() {
  //   axios.get(`/web/treets`).then(response => {
  //     this.setState({treets: response.data.data, loading: false})
  //   }).catch(error => {
  //     console.log(error)
  //     this.setState({loading: false})
  //   })
  // }
  renderTreet(treet) {
    return (
      <div key={treet.id}
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
      <div>
        <a className="twitter-timeline"
           data-height="487"
           data-width="432"
           data-link-color="#2A9D8F"
           href="https://twitter.com/Treesnapapp?ref_src=twsrc%5Etfw">Tweets by Treesnapapp</a>
      </div>
    )
  }
}
