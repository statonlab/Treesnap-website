import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app-root'))