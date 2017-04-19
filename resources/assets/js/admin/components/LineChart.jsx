import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'

export default class LineChart extends Component {
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
            type   : 'line',
            data   : {
                labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    fill                     : true,
                    lineTension              : 0.1,
                    backgroundColor          : 'rgba(42,157,143, .7)',
                    borderColor              : 'rgba(42,157,143, 1)',
                    borderCapStyle           : 'butt',
                    borderDash               : [],
                    borderDashOffset         : 0.0,
                    borderJoinStyle          : 'miter',
                    pointBorderColor         : 'rgba(75,192,192,1)',
                    pointBackgroundColor     : '#fff',
                    pointBorderWidth         : 1,
                    pointHoverRadius         : 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor    : 'rgba(220,220,220,1)',
                    pointHoverBorderWidth    : 2,
                    pointRadius              : 1,
                    pointHitRadius           : 10,
                    data                     : [65, 59, 80, 81, 56, 55, 40],
                    spanGaps                 : false
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