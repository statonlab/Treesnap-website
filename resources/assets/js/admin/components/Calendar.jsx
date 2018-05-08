import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Calendar extends Component {
  constructor(props) {
    super(props)

    let date = moment()

    this.state = {
      date   : date,
      months : this.generateMonths(),
      years  : this.generateYears(date),
      days   : this.generateDays(date),
      hours  : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      minutes: [0, 15, 30, 45]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.date.isSame(this.state.date)) {
      this.setState({date: nextProps.date})
    }
  }

  componentDidMount() {
    if (this.props.date !== null) {
      this.setState({date: this.props.date})
    }
  }

  generateMonths() {
    let months     = []
    let startMonth = moment().day(1)
    for (let month = 1; month <= 12; ++month) {
      months.push(startMonth.month(month - 1).format('MMMM'))
    }

    return months
  }

  generateYears(date) {
    let years       = []
    let initialYear = Math.min(moment().year(), date.year())
    for (let year = initialYear; year <= initialYear + 5; ++year) {
      years.push(year)
    }

    return years
  }

  generateDays(date) {
    let days        = []
    let daysInMonth = date.daysInMonth()
    for (let day = 1; day <= daysInMonth; ++day) {
      days.push(day)
    }

    return days
  }

  render() {
    return (
      <div className="is-flex">
        <div className="mr-0">
          <label className="label font-weight-normal">Month</label>
          <div className="select">
            <select name="month"
                    value={this.state.date.format('MMMM')}
                    onChange={({target}) => {
                      const date = this.state.date.month(target.value)
                      const days = this.generateDays(date)
                      this.setState({
                        date,
                        days
                      })
                    }}>
              {this.state.months.map((month, key) => {
                return (<option value={month} key={key}>{month}</option>)
              })}
            </select>
          </div>
        </div>
        <div className="mr-0">
          <label className="label font-weight-normal">Day</label>
          <div className="select">
            <select name="day"
                    value={this.state.date.date()}
                    onChange={({target}) => {
                      const date = this.state.date.date(target.value)
                      this.setState({date})
                    }}>
              {this.state.days.map((day, key) => {
                return (<option value={day} key={key}>{day}</option>)
              })}
            </select>
          </div>
        </div>
        <div className="mr-1">
          <label className="label font-weight-normal">Year</label>
          <div className="select">
            <select name="year"
                    value={this.state.date.year()}
                    onChange={({target}) => {
                      const date = this.state.date.year(target.value)
                      this.setState({date})
                    }}>
              {this.state.years.map((year, key) => {
                return (<option value={year} key={key}>{year}</option>)
              })}
            </select>
          </div>
        </div>

        <div className="mr-0">
          <label className="label font-weight-normal">Hour</label>
          <div className="select">
            <select name="hour"
                    value={this.state.date.hour()}
                    onChange={({target}) => {
                      const date = this.state.date.hour(target.value)
                      this.setState({date})
                    }}
                    disabled={!this.props.includeTime}>
              {this.state.hours.map((hour, key) => {
                return (<option value={hour} key={key}>{hour}</option>)
              })}
            </select>
          </div>
        </div>
        <div className="mr-0">
          <label className="label font-weight-normal">Minute</label>
          <div className="select">
            <select name="hour"
                    value={this.state.date.minute()}
                    onChange={({target}) => {
                      const date = this.state.date.minute(target.value)
                      this.setState({
                        date
                      })
                    }}
                    disabled={!this.props.includeTime}>
              {this.state.minutes.map((minute, key) => {
                return (<option value={minute} key={key}>{minute}</option>)
              })}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

Calendar.propTypes = {
  date       : PropTypes.object,
  includeTime: PropTypes.bool
}

Calendar.defaultProps = {
  date       : moment(),
  includeTime: true
}
