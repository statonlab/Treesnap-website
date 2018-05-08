import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from './Calendar'
import Errors from '../../helpers/Errors'
import Notify from '../../components/Notify'

export default class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id          : null,
      title       : '',
      timezone    : '',
      start_date  : moment().minute(0).hour(0),
      end_date    : moment().minute(0).hour(0),
      link        : '',
      include_time: true,
      description : '',
      location    : '',
      platform    : '',
      loading     : false,
      errors      : new Errors('')
    }
  }

  componentDidMount() {
    const {event} = this.props

    if (event !== null) {
      let start_date = moment(event.start_date, 'YYYY-MM-DD HH:mm:ss')
      let end_date   = moment(event.end_date, 'YYYY-MM-DD HH:mm:ss')
      this.setState({
        id          : event.id,
        title       : event.title || '',
        timezone    : event.timezone || '',
        start_date  : start_date,
        end_date    : end_date,
        link        : event.link || '',
        description : event.description || '',
        location    : event.location || '',
        platform    : event.platform || '',
        include_time: event.has_start_time && event.has_end_time
      })
    }
  }

  save() {
    this.setState({loading: true})
    const {event} = this.props
    if (event !== null) {
      this.update()
      return
    }

    this.submit()
  }

  update() {
    const data = this.getData()
    axios.put(`/admin/web/event/${data.id}`, data).then(response => {
      this.setState({loading: false})
      this.props.onUpdate(response.data.data)
    }).catch(error => {
      this.setState({loading: false})
      let errors = new Errors(error)
      this.setState({
        errors
      })

      if (errors.has('general')) {
        alert(errors.first('general'))
      } else {
        Notify.push('Validation error. Please review submission.', 'danger')
      }
    })
  }

  submit() {
    const data = this.getData()
    axios.post(`/admin/web/events`, data).then(response => {
      this.setState({loading: false})
      this.props.onSubmit(response.data.data)
    }).catch(error => {
      this.setState({loading: false})
      let errors = new Errors(error)
      this.setState({
        errors
      })

      if (errors.has('general')) {
        alert(errors.first('general'))
      } else {
        Notify.push('Validation error. Please review submission.', 'danger')
      }
    })
  }

  getData() {
    let data = {
      ...this.state,
      start_date    : this.state.start_date.format('YYYY-MM-DD HH:mm:ss'),
      end_date      : this.state.end_date.format('YYYY-MM-DD HH:mm:ss'),
      has_start_time: this.state.include_time,
      has_end_time  : this.state.include_time
    }

    delete data.errors
    delete data.loading

    return data
  }

  clearError(e) {
    this.state.errors.clear(e.nativeEvent.target.name)
  }

  render() {
    const {errors} = this.state
    return (
      <form method="post"
            action={'/admin/web/events'}
            onSubmit={({nativeEvent}) => nativeEvent.preventDefault()}
            onKeyDown={e => this.clearError(e)}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input type="text"
                   className={`input`}
                   name="title"
                   value={this.state.title}
                   onChange={({target}) => this.setState({title: target.value})}
                   placeholder={'Event title'}/>
            {errors.has('title') ? <p className={'help is-danger'}>{errors.first('title')}</p> : null}
          </div>
        </div>

        <div className="field">
          <label className="label">
            Description
          </label>
          <div className="control">
            <textarea className={`textarea`}
                      name="description"
                      value={this.state.description}
                      onChange={({target}) => this.setState({description: target.value})}
                      placeholder={'Event description'}/>
            {errors.has('description') ? <p className={'help is-danger'}>{errors.first('description')}</p> : null}
          </div>
        </div>

        <div className="field">
          <label className="label">Start Date and Time</label>
          <div className="control">
            <label className="checkbox">
              <input type="checkbox"
                     style={{marginRight: '10px'}}
                     value={true}
                     onChange={() => this.setState({include_time: !this.state.include_time})}
                     checked={this.state.include_time}/>
              Include time
            </label>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <Calendar date={this.state.start_date}
                      onChange={start_date => this.setState({start_date})}
                      includeTime={this.state.include_time}/>
            {errors.has('start_date') ? <p className={'help is-danger'}>{errors.first('start_date')}</p> : null}
          </div>
        </div>

        <div className="field">
          <label className="label">End Date and Time</label>
          <div className="control">
            <Calendar date={this.state.end_date}
                      onChange={end_date => this.setState({end_date})}
                      includeTime={this.state.include_time}/>
            {errors.has('end_date') ? <p className={'help is-danger'}>{errors.first('end_date')}</p> : null}
          </div>
        </div>

        <div className="field">
          <label className="label">Timezone</label>
          <div className="control">
            <input type="text"
                   className="input"
                   name="timezone"
                   value={this.state.timezone}
                   placeholder="3-letter timezone such as EST"
                   onChange={({target}) => this.setState({timezone: target.value})}/>
            {errors.has('timezone') ? <p className={'help is-danger'}>{errors.first('timezone')}</p> : null}
          </div>
        </div>

        <div className="field">
          <label className="label is-flex">
            <span>Location</span>
            {this.state.location.length !== 0 ?
              <a className={'ml-auto font-weight-normal text-small'}
                 href={`https://www.google.com/maps/search/?api=1&query=${this.state.location.split('\n').join(' ')}`}
                 target={'_blank'}>
                View on Map
                <small><i className="ml-0 fa fa-external-link"></i></small>
              </a>
              : null}
          </label>
          <div className="control">
            <textarea className={`textarea`}
                      name="location"
                      value={this.state.location}
                      onChange={({target}) => this.setState({location: target.value})}
                      placeholder={'Example address:\n1314 Example St.\nSan Diego, CA 12345'}/>
            {errors.has('location') ? <p className={'help is-danger'}>{errors.first('location')}</p> : null}
          </div>
        </div>

        <div className="field">
          <label className="label">Link to Event</label>
          <div className="control">
            <input type="text"
                   className="input"
                   name="link"
                   value={this.state.link}
                   onChange={({target}) => this.setState({link: target.value})}
                   placeholder={'Optional. Example: https://www.facebook.com/events/1234567891011'}/>
            {errors.has('link') ? <p className={'help is-danger'}>{errors.first('link')}</p> : null}
          </div>
        </div>

        {this.state.link.length !== 0 ?
          <div className="field">
            <label className="label">Link Platform</label>
            <div className="control">
              <input type="text"
                     className="input"
                     name="platform"
                     value={this.state.platform}
                     onChange={({target}) => this.setState({platform: target.value})}
                     placeholder={'Optional. Examples: Facebook or Eventbee'}/>
              {errors.has('platform') ? <p className={'help is-danger'}>{errors.first('platform')}</p> : null}
            </div>
            <p className="help">
              When provided, the link will appear as "<a href={this.state.link} target={'_blank'}>
              View event on {this.state.platform || 'platform'}</a>" on the event page.
            </p>
          </div>
          : null}

        <div className="field is-flex">
          <button type="button"
                  onClick={this.save.bind(this)}
                  className={`button is-primary${this.state.loading ? ' is-loading' : ''}`}
                  disabled={this.state.loading}>
            Save
          </button>
          {typeof this.props.onCancel === 'function' ?
            <button type="button"
                    className="button ml-auto"
                    onClick={() => this.props.onCancel()}>
              Cancel
            </button>
            : null}
        </div>
      </form>
    )
  }
}

EventForm.propTypes = {
  event   : PropTypes.object,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onCancel: PropTypes.func
}

EventForm.defaultProps = {
  event   : null,
  onCreate() {
  },
  onUpdate() {
  },
  onCancel: null
}
