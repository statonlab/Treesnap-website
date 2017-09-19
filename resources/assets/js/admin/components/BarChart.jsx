import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Spinner from '../../components/Spinner'

export default class BarChart extends Component {
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
      type   : 'bar',
      data   : {
        labels  : ['Spring', 'Summer', 'Fall', 'Winter'],
        datasets: [{
          label          : 'American Chestnut',
          backgroundColor: '#2A9D8F',
          borderWidth    : 0,
          data           : [65, 59, 8, 81]
        }, {
          label          : 'Hemlock',
          backgroundColor: '#f39c12',
          borderWidth    : 0,
          data           : [98, 56, 45, 32]
        }, {
          label          : 'Ash',
          backgroundColor: '#4d7ec8',
          borderWidth    : 0,
          data           : [11, 76, 22, 54]
        }, {
          label          : 'Other',
          backgroundColor: '#bf5329',
          borderWidth    : 0,
          data           : [34, 12, 34, 12]
        }, {
          label          : 'White Oak',
          borderWidth    : 0,
          backgroundColor: 'rgb(220, 220, 220)',
          data           : [5, 59, 67, 4]
        }]
      },
      options: {
        responsive: false,
        legend    : {
          display : true,
          position: 'bottom'
        },
        scales    : {
          yAxes: [{
            stacked: false
          }]
        }
      }
    })
  }
}

BarChart.PropTypes = {
  url: PropTypes.string
}