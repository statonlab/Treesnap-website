import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Spinner from '../../components/Spinner'

export default class LineChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    return (
      <div>
        <Spinner visible={this.state.loading} inline={true}/>
        <canvas ref="canvas" style={{height: '200px', width: '100%'}}></canvas>
      </div>
    )
  }

  componentDidMount() {
    let el    = ReactDOM.findDOMNode(this.refs.canvas)
    let ctx   = el.getContext('2d')
    let chart = new Chart(ctx, {
      type   : 'line',
      data   : {
        labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
          pointBackgroundColor : '#fff',
          pointBorderWidth     : 3,
          pointHoverRadius     : 8,
          pointHoverBorderWidth: 2,
          pointRadius          : 4,
          pointHitRadius       : 10,
          data                 : [4, 5, 7, 8, 9, 14, 17],
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
          pointBackgroundColor : '#fff',
          pointBorderWidth     : 3,
          pointHoverRadius     : 8,
          pointHoverBorderWidth: 2,
          pointRadius          : 4,
          pointHitRadius       : 10,
          data                 : [65, 59, 80, 81, 56, 55, 40],
          spanGaps             : false
        }]
      },
      options: {
        responsive: false,
        legend    : {
          display : true,
          position: 'bottom'
        }
      }
    })
  }
}

LineChart.PropTypes = {
  url: PropTypes.string
}