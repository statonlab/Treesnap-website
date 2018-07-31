import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Spinner from '../../components/Spinner'

export default class BarChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

//   [{
//     label          : 'American Chestnut',
//     stack          : '1',
//     borderWidth    : 0,
//     data           : [65, 59, 8, 81]
//   }, {
//   stack          : '1',
//   label          : 'Hemlock',
//   backgroundColor: '#f39c12',
//   borderWidth    : 0,
//   data           : [98, 56, 45, 32]
// }, {
//   stack          : '1',
//     label          : 'Ash',
//     backgroundColor: '#4d7ec8',
//     borderWidth    : 0,
//     data           : [11, 76, 22, 54]
// }, {
//   stack          : '1',
//     label          : 'Other',
//     backgroundColor: '#bf5329',
//     borderWidth    : 0,
//     data           : [34, 12, 34, 12]
// }, {
//   stack          : '1',
//     label          : 'White Oak',
//     borderWidth    : 0,
//     backgroundColor: 'rgb(220, 220, 220)',
//     data           : [5, 59, 67, 4]
// }]
  componentDidMount() {
    let colors = [
      '#2A9D8F',
      '#f39c12',
      '#4d7ec8',
      '#bf5329',
      '#FFE0B5',
      '#dcdcdc',
      '#F37021',
      '#2F2F2F',
      '#EAC435',
      '#345995'
    ]

    axios.get('/admin/web/analytics/observations-over-time').then(response => {
      let aggregated = response.data.data
      let matrix     = {}
      let labels     = []
      let categories = []

      aggregated.forEach(row => {
        labels.push(row.label)
        matrix[row.label] = {}
        row.data.forEach(column => {
          matrix[row.label][column.observation_category] = column.observations_count
        })
        categories = Object.keys(matrix[row.label])
      })

      let dataset = []
      categories.forEach((category, index) => {
        let data = {
          stack          : '1',
          label          : category,
          backgroundColor: colors[index] || '#dcdcdc',
          data           : []
        }

        labels.forEach(label => {
          data.data.push(matrix[label][category])
        })

        dataset.push(data)
      })

      this.createChart(labels, dataset)
      this.setState({loading: false})
    }).catch(error => {
      this.setState({loading: false})

      console.warn(error)
    })
  }


  createChart(labels, datasets) {
    let el  = ReactDOM.findDOMNode(this.refs.canvas)
    let ctx = el.getContext('2d')
    new Chart(ctx, {
      type   : 'bar',
      data   : {
        labels,
        datasets
      },
      options: {
        responsive: false,
        tooltips  : {
          mode     : 'index',
          intersect: false
        },
        legend    : {
          display : true,
          position: 'bottom'
        },
        scales    : {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    })
  }

  render() {
    return (
      <div>
        <Spinner visible={this.state.loading} inline={true}/>
        <canvas ref="canvas" style={{height: '400px', width: '100%'}}></canvas>
      </div>
    )
  }
}

BarChart.propTypes = {
  url: PropTypes.string
}
