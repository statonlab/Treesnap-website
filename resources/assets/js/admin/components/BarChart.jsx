import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'

export default class BarChart extends Component {
    render() {
        return React.createElement('canvas', {
            ref  : 'canvas',
            style: {
                height: '100px'
            }
        })
    }

    componentDidMount() {
        let el    = ReactDOM.findDOMNode(this)
        let ctx   = el.getContext('2d')
        let chart = new Chart(ctx, {
            type   : 'bar',
            data   : {
                labels  : ['Spring', 'Summer', 'Fall', 'Winter'],
                datasets: [{
                    label          : 'My First dataset',
                    backgroundColor: [
                        '#2A9D8F',
                        '#2A9D8F',
                        '#2A9D8F',
                        '#2A9D8F',
                        '#2A9D8F',
                        '#2A9D8F'
                    ],
                    borderWidth    : 0,
                    data           : [65, 59, 80, 81]
                }]
            },
            options: {
                responsive: true,
                legend    : {
                    display: false
                }
            }
        })
    }
}