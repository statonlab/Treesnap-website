import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Spinner from '../../components/Spinner'

export default class DoughnutChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
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
    new Chart(ctx, {
      type   : 'doughnut',
      data   : {
        labels  : labels,
        datasets: [{
          data           : data,
          backgroundColor: [
            '#2A9D8F',
            '#4d7ec8',
            '#f39c12',
            '#bf5329',
            '#FFE0B5'
          ]
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
}

DoughnutChart.propTypes = {
  url: PropTypes.string.isRequired
}
