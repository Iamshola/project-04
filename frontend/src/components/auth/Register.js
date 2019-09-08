import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {},
      workspaces: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register/', this.state.formData)
      .then(res => {
        toast.success(res.data.message)
        this.props.history.push({  pathname: '/login/', state: res.data.user
        })
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    return (
      <section className="login is-fullheight">
        <div className="login-body">
          <div className="column">
            <div className="container v-middle">
              <div className="columns login-page">
                <div className="column is-5 login-sidebar is-hidden-mobile">
                  <div className="login-gradient-background">
                    <h1>Register</h1>
                  </div>
                </div>
                <div className="column is-7 login-form-wrapper">

                  <div className="column is-12 field-box">
                    <div className="column is-7 is-offset-1">
                      <h1 className="login-heading">Welcome to the Site</h1>
                      <p className="login-subheading">Fill out thisto access super awesome imaginary control panel</p>

                      <form onSubmit={this.handleSubmit}>
                        <div className="field">
                          <p className="control has-icons-left has-icons-right">
                            <input
                              className="input is-rounded"
                              name="username"
                              placeholder="eg: Philip1992"
                              onChange={this.handleChange}
                            />
                            {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
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
                              type="email"
                              name="email"
                              placeholder="eg: philip1992@email.co.uk"
                              onChange={this.handleChange}
                            />
                            {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                            <span className="icon is-medium is-left">
                              <i className="fa fa-lock"></i>
                            </span>
                            <span className="icon is-small is-right">
                              <i className="fa fa-eye"></i>
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
                            {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                            <span className="icon is-medium is-left">
                              <i className="fa fa-lock"></i>
                            </span>
                            <span className="icon is-small is-right">
                              <i className="fa fa-eye"></i>
                            </span>
                          </p>
                        </div>

                        <div className="field">
                          <p className="control has-icons-left has-icons-right">
                            <input
                              className="input is-rounded"
                              type="password"
                              name="password_confirmation"
                              placeholder="eg: ••••••••"
                              onChange={this.handleChange}
                            />
                            {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}
                            <span className="icon is-medium is-left">
                              <i className="fa fa-lock"></i>
                            </span>
                            <span className="icon is-small is-right">
                              <i className="fa fa-eye"></i>
                            </span>
                          </p>
                        </div>
                        <div className="field is-grouped is-grouped-centered login-btn-group">
                          <p className="control">
                            <button className="login-btn">
                          Register!
                            </button>
                          </p>
                          <p className="control">
                            <Link to="/login" className="">Already a member? Sign in! </Link>
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

export default Register
