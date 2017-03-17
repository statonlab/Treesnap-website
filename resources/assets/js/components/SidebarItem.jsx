import React, {Component, PropTypes} from 'react'

export default class SidebarItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: true
        }
    }

    clicked(e) {
        e.preventDefault()
        this.setState({selected: !this.state.selected})
        let event = new CustomEvent('filter', {detail: this.props.name})
        document.dispatchEvent(event)
    }

    render() {
        return (
            <a className="button is-full" onClick={this.clicked.bind(this)} style={{marginBottom: '.1em'}}>
                <span className="icon" style={{marginRight: '.6rem'}}>
                    <i className="fa fa-check" style={{color: this.state.selected ? '#2A9D8F' : '#aaa'}}></i>
                </span>
                <span>{this.props.name}</span>
            </a>
        )
    }
}

SidebarItem.PropTypes = {
    name: PropTypes.string.isRequired
}