import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Spinner from '../../components/Spinner'
import randomColor from 'randomcolor'

export default class DoughnutChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    axios.get(this.props.url).then(response => {
      let data = response.data.data
      this.createChart(data.labels, data.dataset)
    }).catch(error => {
      console.log(error)
    }).then(() => {
      this.setState({loading: false})
    })
  }

  createChart(labels, data) {
    let el  = ReactDOM.findDOMNode(this.refs.canvas)
    let ctx = el.getContext('2d')

    let colors = labels.map((label, index) => {
      return randomColor({seed: index, hue: 'random', luminosity: 'random'})
    })

    colors = [
      '#2A9D8F',
      '#4d7ec8',
      '#f39c12',
      '#bf5329',
      '#FFE0B5'
    ].concat(colors.slice(0, labels.length - 5))

    new Chart(ctx, {
      type   : 'doughnut',
      data   : {
        labels  : labels,
        datasets: [{
          data           : data,
          backgroundColor: colors
        }]
      },
      options: {
        legend    : {
          position: 'right'
        },
        responsive: false
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

DoughnutChart.propTypes = {
  url: PropTypes.string.isRequired
}
