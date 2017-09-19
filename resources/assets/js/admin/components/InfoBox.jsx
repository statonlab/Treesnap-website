import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/Spinner'

export default class InfoBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      body   : ''
    }
  }

  componentWillMount() {
    if (this.props.body !== '') {
      this.setState({body: this.props.body})
      return
    }

    if (this.props.url !== '') {
      this.setState({loading: true})
      axios.get(this.props.url).then(response => {
        this.setState({body: response.data.data})
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.setState({loading: false})
      })
    }
  }

  render() {
    return (
      <div className={`box info-box ${this.props.style}`}>
        <h4 className="title is-4">{this.props.title}</h4>
        <div className="info-box-text">{this.state.body}</div>
        <Spinner visible={this.state.loading} inline={true} containerStyle={{color: '#4d7ec8'}}/>
      </div>
    )
  }
}

InfoBox.PropTypes = {
  icon : PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body : PropTypes.string,
  style: PropTypes.string,
  url  : PropTypes.string
}

InfoBox.defaultProps = {
  style: 'is-primary',
  body : '',
  url  : ''
}