import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class ButtonList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: []
        }
    }

    componentWillMount() {
        if (this.props.selectedByDefault) {
            this.setState({selected: this.props.list})
        }
    }

    componentWillReceiveProps(props) {
        if (props.list !== this.props.list && this.props.selectedByDefault) {
            this.setState({
                selected: props.list
            })
        }
    }

    reset() {
        this.setState({selected: []})
    }

    _setActiveSelected(item) {
        return this.state.selected.indexOf(item) > -1 ? ' is-selected' : ''
    }

    _toggleSelected(item) {
        let selected = []
        if (this.state.selected.indexOf(item) > -1) {
            selected = this.state.selected.filter(one => {
                return one !== item
            })
        } else {
            selected = this.state.selected
            selected.push(item)
        }

        this.setState({selected})
        this.props.onChange(selected)
    }

    render() {
        return (
            <div className="control buttons-group">
                {this.props.list.map((item, index) => {
                    return (
                        <button type="button"
                                className={`button mb-0 button-select${this._setActiveSelected(item)}`}
                                key={index}
                                onClick={() => this._toggleSelected(item)}>
                            <span className="icon is-small">
                                <i className="fa fa-check"></i>
                            </span>
                            <span>{item}</span>
                        </button>
                    )
                })}
            </div>
        )
    }
}

ButtonList.PropTypes = {
    list             : PropTypes.array.isRequired,
    onChange         : PropTypes.func.isRequired,
    selectedByDefault: PropTypes.bool
}

ButtonList.defaultProps = {
    selectedByDefault: false
}