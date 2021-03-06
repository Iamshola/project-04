import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ReactFilestack from 'filestack-react'

const FilestackToken = process.env.FilestackToken

const options = {
  accept: 'image/*',
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}

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
    console.log(this.state.formData)
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

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
    console.log('hello', this.state.formData)
  }

  render() {
    return (
      <section className="register is-fullheight">
        <div className="register-body">
          <div className="column is-white">
            <div className="container v-middle">
              <div className="columns register-page">
                <div className="column is-5 register-sidebar is-hidden-mobile">
                  <div className="register-gradient-background">

                  </div>
                </div>
                <div className="column is-7 register-form-wrapper">

                  <div className="column is-12 field-box">
                    <div className="column is-7 is-offset-1">
                      <h1 className="title is-3 heading has-text-centered">Register</h1>
                      <h1 className="register-heading has-text-centered">Welcome to the Site</h1>
                      <p className="register-subheading has-text-centered">Fill out thisto access super awesome imaginary control panel</p>

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
                        <br />
                        <div className="field center">
                          <p className="">Upload Profile Picture</p>
                          <ReactFilestack
                            mode="transform"
                            apikey={FilestackToken}
                            buttonText="Upload Photo"
                            buttonClass="button"
                            className="upload-image"
                            options={options}
                            onSuccess={(result) => this.handleUploadImages(result)}
                            preload={true}
                          />
                          {this.state.formData.image && <img src={this.state.formData.image} />}
                        </div>

                        <br />
                        <br />

                        <div className="field is-grouped is-grouped-centered register-btn-group">
                          <p className="control">
                            <button className="register-btn title is-6 heading">
                          Register!
                            </button>
                          </p>
                          <p className="control ">
                            <Link to="/login" className="">Already a member? Sign in! </Link>
                          </p>
                        </div>
                      </form>
                      <hr />

                      <p>Dont worry you can complete your profile later!</p>
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
