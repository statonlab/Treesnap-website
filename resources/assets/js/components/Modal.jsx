import React, {Component, PropTypes} from 'react'


let LoginForm = (
    <div className="box" style={{padding: '20px'}}>
        <h3 className="title is-4" style={{borderBottom: '1px solid #dedede', paddingBottom: 10}}><strong>Login</strong>
        </h3>
        <form action="/" method="post">
            <div className="field">
                <label className="label">Username</label>
                <p className="control">
                    <input className="input" type="text" placeholder="Username" autoFocus={true}/>
                </p>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <p className="control">
                    <input className="input" type="password" placeholder="Password"/>
                </p>
            </div>

            <div className="field">
                <p className="control">
                    <label className="checkbox">
                        <input type="checkbox"/>
                        Remember me
                    </label>
                </p>
            </div>

            <div className="field">
                <button type="submit" className="button is-primary">Login</button>
            </div>
        </form>
    </div>
)


let aboutModal = (
    <div className="box" style={{padding: '20px'}}>
        <h3 className="title is-4" style={{borderBottom: '1px solid #dedede', paddingBottom: 10}}>
            <strong>About Treesnap</strong>
        </h3>
        <div className="boxItem" style={{padding: '20px'}}>
            <strong>Treesnap</strong> is collaboration between citizens and scientists to improve breeding efforts for
            foresters at the University of Kentucky. Participants download the Treesnap app and, with it, tag American
            Chestnut, Hemlock, Ash, and White Oak trees out in the field. After taking a photo of the tree and answering
            a few questions, the tree is added to the Treesnap database. Breeders at the University of Kentucky use
            the tree data collected to track disease and identify candidates for DNA sequencing and breeding efforts.
        </div>
        <div className="boxItem" style={{padding: '20px'}}>
            If you would like to participate in the <strong>Treesnap</strong> project, create an account and find our
            app on the Android or iOS store.
        </div>
        <h3 className="title is-4" style={{borderBottom: '1px solid #dedede', paddingBottom: 10}}>About the
            creators</h3>
        <div className="boxItem" style={{padding: '20px'}}>
            Treesnap is written and developed in the Staton laboratory at the University of Tennessee-Knoxville by
            Abdullah Almsaeed and Bradford Condon. The Treesnap citizen science collection project...
        </div>
        <img src={'../images/Download_on_the_App_Store_Badge_US-UK_135x40.svg'} height="40" width="135"/>
        <img src={'../images/google-play-badge.png'} height="40" width="135"/>
    </div>
)


export default class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            type: null
        }
    }

    close() {
        this.setState({open: false})
    }

    open(type) {
        this.setState({type: type})
        this.setState({open: true})
    }


    render() {
        let modalBody
        if (this.state.type === 'login') {
            modalBody = LoginForm
        }
        if (this.state.type === 'about') {
            modalBody = aboutModal
        }
        return (
            <div className={`modal${this.state.open ? ' is-active' : ''}`}>
                <div className="modal-background" onClick={this.close.bind(this)}></div>
                <div className="modal-content">
                    {modalBody}
                </div>
                <button className="modal-close" onClick={this.close.bind(this)}></button>
            </div>
        )
    }
}

Modal.PropTypes = {
    name: PropTypes.string.isRequired
}