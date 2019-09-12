import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        Auth.setUser(res.data.user)
        toast.success(res.data.message)
        this.props.history.push({
          pathname: '/workspaces/',
          state: res.data.user
        })
      })
      .catch(() => {
        Auth.removeToken()
        Auth.removeUser()
        this.setState({ error: 'Invalid credentials' })
      })

  }

  render() {
    console.log(this.state)
    return (
      <section className="login is-fullheight">
        <div className="login-body">
          <div className="column is-white">
            <div className="container v-middle">
              <div className="columns login-page">
                <div className="column is-5 login-sidebar is-hidden-mobile">
                  <div className="login-gradient-background">

                  </div>
                </div>

                <div className="column is-7 login-form-wrapper">
                  <div className="column is-12 field-box">
                    <div className="column is-7 is-offset-1">
                      <h1 className="title is-3 heading has-text-centered">Login</h1>
                      <h1 className="login-heading has-text-centered">Welcome Back</h1>
                      <p className="login-subheading has-text-centered">Fill out thisto access super awesome imaginary control panel</p>

                      <form onSubmit={this.handleSubmit}>
                        <div className="field">
                          <p className="control has-icons-left has-icons-right">
                            <input
                              className="input is-rounded"
                              type="email"
                              name="email"
                              placeholder="eg: example@example.co.uk"
                              onChange={this.handleChange}
                            />
                            <span className="icon is-medium is-left">
                              <i className="fa fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                              <i className="fa fa-check"></i>
                            </span>
                          </p>
                        </div>


                        <div className="field">
                          <p className="control has-icons-left has-icons-right">
                            <input
                              className="input is-rounded"
                              type="password"
                              name="password"
                              placeholder="eg: ••••••••"
                              onChange={this.handleChange}
                            />
                            <span className="icon is-medium is-left">
                              <i className="fa fa-lock"></i>
                            </span>
                            <span className="icon is-small is-right">
                              <i className="fa fa-eye"></i>
                            </span>
                          </p>
                        </div>

                        {this.state.error && <small className="help is-danger">{this.state.error}</small>}
                        <div className="field is-grouped is-grouped-centered login-btn-group">
                          <p className="control">
                            <button className="login-btn title is-6 heading">
                          Login
                            </button>
                          </p>
                          <p className="control">
                            <a className="forgot-link" >Forgot Password</a>
                          </p>
                        </div>

                      </form>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
