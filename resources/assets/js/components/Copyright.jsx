import React, {Component, PropTypes} from 'react'

export default class Copyright extends Component {
    render() {
        return (
            <footer className="copyright">
                Data &copy;2017 <a target="_blank" href="https://utk.edu">UTK</a> and <a target="_blank" href="http://www.uky.edu/UKHome/">UKY</a>
            </footer>
        )
    }
}

Copyright.PropTypes = {
    name: PropTypes.string.isRequired
}