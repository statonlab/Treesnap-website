import React, {Component, PropTypes} from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                &copy;2017 <a target="_blank" href="https://utk.edu">UTK</a> and <a target="_blank" href="http://www.uky.edu/UKHome/">UKY</a>
            </footer>
        )
    }
}

Footer.PropTypes = {
    name: PropTypes.string.isRequired
}