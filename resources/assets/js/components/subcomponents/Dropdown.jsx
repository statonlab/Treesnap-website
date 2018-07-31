import React, {Component} from 'react'
import DropdownItem from './DropdownItem'
import PropTypes from 'prop-types'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      other: null,
      show : false
    }
  }

  componentWillMount() {
    let items = []
    let other = null
    React.Children.map(this.props.children, child => {
      if (child.type && child.type === DropdownItem) {
        items.push(child)
      } else {
        other = React.cloneElement(child, {
          onClick: () => {
            this.setState({show: !this.state.show})
          }
        })
      }
    })

    this.setState({items, other})
  }

  render() {
    return (
      <div className={`dropdown${this.state.show ? ' show' : ''} ${this.props.className || ''}`}>
        {this.state.other}
        <ul className={`dropdown-menu${this.props.right ? ' right' : ' left'}`}
            onClick={() => this.setState({show: false})}>
          {this.state.items}
        </ul>
        <div className="dropdown-backdrop" onClick={() => this.setState({show: false})}></div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  right: PropTypes.bool
}

Dropdown.defaultProps = {
  right: false
}
