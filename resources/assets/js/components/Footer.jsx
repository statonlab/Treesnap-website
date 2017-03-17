import React, {Component, PropTypes} from 'react'

export default class Footer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <footer className="main-footer">
                Copyright 2017&copy; University of Tennessee at Knoxville
            </footer>
        )
    }
}

Footer.PropTypes = {
    name: PropTypes.string.isRequired
}