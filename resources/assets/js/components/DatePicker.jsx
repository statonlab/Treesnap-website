import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'
import { DayPickerSingleDateController } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }

    this.units = window.TreeSnap ? window.TreeSnap.units : 'US'
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickHandler.bind(this), true)

    this.element = document.getElementById(this.props.id)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickHandler.bind(this), true)
  }

  onClickHandler(event) {
    if (this.state.focused) {
      if (event.target !== this.element && !this.element.contains(event.target)) {
        this.setState({
          focused  : false,
          formatted: ''
        })
      }
    }
  }

  render() {
    return (
      <div style={{position: 'relative'}} id={this.props.id}>
        {this.props.date !== null ?
          <button className="delete"
                  style={{
                    position: 'absolute',
                    zIndex  : 900,
                    top     : 7,
                    right   : 7
                  }}
                  onClick={() => {
                    this.props.onDateChange(null)
                  }} type={'button'}></button>
          : null}
        <input
          type="text"
          className="input"
          value={this.props.date ? this.props.date.format(this.units === 'US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY') : ''}
          placeholder={this.props.placeholder + ' ' + (this.units === 'US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY')}
          onChange={({target}) => this.setState({formatted: target.value})}
          onClick={() => {
            if (!this.state.focused) {
              this.setState({focused: true})
            }
          }}/>
        {this.state.focused ?
          <div style={{position: 'absolute', backgroundColor: '#fff', zIndex: 100}}>
            <DayPickerSingleDateController
              date={this.props.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.props.onDateChange(date)} // PropTypes.func.isRequired
              focused={this.props.focused} // PropTypes.bool
              onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
              isOutsideRange={() => false}
            />
          </div>
          : null}
      </div>
    )
  }
}

DatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  date        : PropTypes.any,
  placeholder : PropTypes.string,
  id          : PropTypes.string.isRequired
}

DatePicker.defaultProps = {
  placeholder: 'Date'
}
