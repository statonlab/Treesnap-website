import React, {Component} from 'react'
import DeveloperTokensForm from '../components/DeveloperTokensForm'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
import Notify from '../components/Notify'
import User from '../helpers/User'

export default class DeveloperScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokens : [],
      loading: false
    }
  }

  componentDidMount() {
    this.loadTokens()
  }

  loadTokens() {
    this.setState({loading: true})

    axios.get('/web/oauth/personal-tokens').then(({data}) => {
      this.setState({
        loading: false,
        tokens : data.data.map(this.setUpToken)
      })
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  setUpToken(token) {
    token.show = false
    return token
  }

  toggleToken(token) {
    this.setState({
      tokens: this.state.tokens.map(t => {
        if (t.id === token.id) {
          t.show = !token.show
        }
        return t
      })
    })
  }

  delete(token) {
    if (!confirm(`Are you sure you want to delete "${token.name}"?`)) {
      return
    }

    axios.delete(`/web/oauth/personal-token/${token.id}`).then(response => {
      Notify.push(`Token ${token.name} was deleted successfully`)
      this.setState({
        tokens: this.state.tokens.filter(t => t.id !== token.id)
      })
    }).catch(error => {
      Notify.push('An error occurred while deleting the token. Please try again later.', 'danger')
      console.log(error)
    })
  }

  renderTokensTable() {
    if (this.state.tokens.length <= 0) {
      return
    }

    return (
      <table className={'table'}>
        <thead>
        <tr>
          <th>Name</th>
          <th>token</th>
          <th>Expiration Date</th>
          <th className={'has-text-right'}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {this.state.tokens.map(token => {
          return (
            <tr key={token.id}>
              <td>{token.name}</td>
              <td>
                {token.show ?
                  <div>
                    <textarea className="textarea" readOnly={true}>{token.access_token}</textarea>
                    <a href="javascript:;"
                       style={{marginLeft: 3}}
                       onClick={() => this.toggleToken(token)}>
                      hide
                    </a>
                  </div>
                  :
                  <div>
                    {[1, 2, 3, 4, 5, 6].map((n, i) => {
                      return (
                        <small style={{fontSize: 9}} key={i}>
                          <i className="fa fa-circle" style={{marginRight: 1}}></i>
                        </small>
                      )
                    })}
                    <a href="javascript:;"
                       style={{marginLeft: 3}}
                       onClick={() => this.toggleToken(token)}>
                      show
                    </a>
                  </div>
                }
              </td>
              <td>{token.expires_at}</td>
              <td className={'has-text-right'}>
                <button type="button"
                        className="button is-outlined is-small is-danger"
                        onClick={() => this.delete(token)}>
                  <span className="icon is-small">
                    <i className="fa fa-trash"></i>
                  </span>
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }

  renderAuthenticated() {
    return (
      <div>
        <div className="box">
          <h3 className="title is-5">API Tokens</h3>
          {this.state.tokens.length <= 0 && !this.state.loading ?
            <div className="alert is-warning">
              You have no API tokens. Use the form below to create a new one.
            </div>
            : this.renderTokensTable()}
        </div>
        <div className="box">
          <h3 className="title is-5">Create New API Tokens</h3>
          <DeveloperTokensForm
            onCreate={token => {
              Notify.push('Token created successfully!', 'success')
              this.setState({tokens: [this.setUpToken(token)].concat(this.state.tokens)})
            }}/>
        </div>
      </div>
    )
  }

  renderUnauthenticated() {
    return (
      <div>
        <div className="box">
          <div className="alert is-danger mb-none">
            Please <a href="/login">login</a> to view this page.
          </div>
        </div>
      </div>
    )
  }

  render() {

    return (
      <div>
        <Navbar/>
        <div className="home-section short-content">
          <div className="container">
            <div className="columns">
              <div className="column is-12">
                <h1 className="title is-3">Developer Dashboard</h1>
                {User.authenticated() ? this.renderAuthenticated() : this.renderUnauthenticated()}
              </div>
            </div>
          </div>
        </div>
        <HomeFooter/>
        <Spinner visibile={this.state.loading}/>
      </div>
    )
  }
}
