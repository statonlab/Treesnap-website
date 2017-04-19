import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'

export default class DoughnutChart extends Component {
    render() {
        return React.createElement('canvas', {
            ref   : 'canvas',
            style: {
                height: '100px'
            }
        })
    }

    componentDidMount() {
        let el    = ReactDOM.findDOMNode(this)
        let ctx   = el.getContext('2d')
        let chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels  : [
                    'American Chestnut',
                    'Ash',
                    'Hemlock',
                    'White Oak',
                    'Other'
                ],
                datasets: [{
                    data                : [300, 150, 100, 400, 20],
                    backgroundColor     : [
                        '#2A9D8F',
                        '#4d7ec8',
                        '#f39c12',
                        '#bf5329'
                    ]
                }]
            },
            options: {
                legend: {
                    position: 'right'
                },
                responsive: true
            }
        })
    }
}