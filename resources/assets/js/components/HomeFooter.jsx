import React, {Component} from 'react'

export default class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <div className="container is-small">
                    <p>
                        Copyright &copy; 2017 University of Tennessee and University of Kentucky.
                    </p>
                    
                    <div className="columns logos">
                        <div className="column">
                            <img src="/images/ut3.png" alt="University of Tennessee Logo"/>
                        </div>
                        <div className="column">
                            <img src="/images/uky2.png" alt="University of Kentucky Logo"/>
                        </div>
                        <div className="column">
                            <img src="/images/nsf1.png" alt="NSF Logo"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}