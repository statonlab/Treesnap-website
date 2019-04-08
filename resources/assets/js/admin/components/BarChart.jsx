import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Spinner from '../../components/Spinner'
import randomColor from 'randomcolor'

export default class BarChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    axios.get('/admin/web/analytics/observations-over-time').then(response => {
      let aggregated = response.data.data
      let matrix     = {}
      let labels     = []
      let categories = []
      let colors =[]

      aggregated.forEach((row, index) => {
        labels.push(row.label)
        matrix[row.label] = {}
        row.data.forEach(column => {
          matrix[row.label][column.observation_category] = column.observations_count
        })
        categories = Object.keys(matrix[row.label])
        colors.push(randomColor({seed: index * index, luminosity: 'dark'}))
      })

      // let allColors = [
      //   '#2A9D8F',
      //   '#4d7ec8',
      //   '#f39c12',
      //   '#bf5329',
      //   '#FFE0B5'
      // ].concat(colors.slice(0, categories.length - 5))

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
