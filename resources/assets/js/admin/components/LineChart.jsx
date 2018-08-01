import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Spinner from '../../components/Spinner'

export default class LineChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    axios.get('/admin/web/analytics/users-over-time').then(response => {
      let labels        = []
      let trained_users = []
      let users         = []

      response.data.data.map(datum => {
        labels.push(datum.date)
        trained_users.push(datum.trained_count)
        users.push(datum.users_count)
      })

      this.createChart(labels, users, trained_users)

      this.setState({loading: false})
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  createChart(labels, users, trained_users) {
    let el    = ReactDOM.findDOMNode(this.refs.canvas)
    let ctx   = el.getContext('2d')
    let chart = new Chart(ctx, {
      type   : 'line',
      data   : {
        labels,
        datasets: [{
          label                : 'Trained Users',
          fill                 : false,
          lineTension          : 0.1,
          backgroundColor      : '#f39c12',
          borderColor          : '#f39c12',
          borderCapStyle       : 'butt',
          borderDash           : [],
          borderDashOffset     : 0.0,
          borderJoinStyle      : 'miter',
          pointBorderColor     : '#f39c12',
          pointBackgroundColor : '#f39c12',
          pointBorderWidth     : 3,
          pointHoverRadius     : 8,
          pointHoverBorderWidth: 2,
          pointRadius          : 4,
          pointHitRadius       : 10,
          data                 : trained_users,
          spanGaps             : false
        }, {
          label                : 'All Users',
          fill                 : false,
          lineTension          : 0.1,
          backgroundColor      : 'rgba(42,157,143, 1)',
          borderColor          : 'rgba(42,157,143, 1)',
          borderCapStyle       : 'butt',
          borderDash           : [],
          borderDashOffset     : 0.0,
          borderJoinStyle      : 'miter',
          pointBorderColor     : 'rgba(42,157,143, 1)',
          pointBackgroundColor : 'rgba(42,157,143, 1)',
          pointBorderWidth     : 3,
          pointHoverRadius     : 8,
          pointHoverBorderWidth: 2,
          pointRadius          : 4,
          pointHitRadius       : 10,
          data                 : users,
          spanGaps             : false
        }]
      },
      options: {
        responsive: false,
        legend    : {
          display : true,
          position: 'bottom'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
      }
    })
  }

  render() {
    return (
      <div>
        <Spinner visible={this.state.loading} inline={true}/>
        <canvas ref="canvas" style={{height: '200px', width: '100%'}}></canvas>
      </div>
    )
  }
}

LineChart.propTypes = {
  url: PropTypes.string
}
