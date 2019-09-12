import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
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

class UserEdit extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeNormal = this.handleChangeNormal.bind(this)

  }

  handleChangeNormal(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/users/${this.props.match.params.id}/`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/users/'))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/`)
      .then(res => this.setState({ formData: res.data }))
  }

  render() {
    console.log(this.state.formData)
    console.log(this.state.errors, 'errors')
    return (
      <section className="hero">
        <div className="hero-body user-edit">
          <div className="container">
            <section className="hero new">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title is-2 heading has-text-centered">My Space</h1>
                  <h1 className="subtitle is-2 has-text-centered">{this.state.formData.username}'s Profile</h1>
                </div>
              </div>
            </section>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div className="columns">
                <div className="column is-3">
                  <div className="field">
                    <label className="label">Image</label>
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
                    {this.state.formData.image && <figure className="image is-4by3">
                      <img className="is-rounded" src={this.state.formData.image} />
                    </figure> }
                  </div>
                </div>

                <div className="column">
                  <div className="field">
                    <br />
                    <h1 className="title is-5 heading has-text-centered">General Info</h1>
                    <hr />
                    <label className="label title is-6 heading">City</label>
                    <input
                      className="input"
                      name="user_city"
                      placeholder="London"
                      value={this.state.formData.user_city || ''}
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.user_city && <small className="help is-danger">{this.state.errors.user_city}</small>}
                  </div>
                  <div className="field">
                    <label className="label title is-6 heading">Interest</label>
                    <textarea
                      className="textarea"
                      name="interest"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                      value={this.state.formData.interest || ''}
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.interest && <small className="help is-danger">{this.state.errors.interest}</small>}
                  </div>
                  <br />
                  <h1 className="title is-5 heading has-text-centered">Contact</h1>
                  <hr />
                  <div className="field">

                    <label className="label title is-6 heading">Linkedin Link</label>
                    <input
                      className="input"
                      name="linked_In_Link"
                      placeholder="eg: LoveExp Cafe"
                      value={this.state.formData.linked_In_Link|| ''}
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.linked_In_Link && <small className="help is-danger">{this.state.errors.linked_In_Link}</small>}
                  </div>
                  <button className="login-btn">Submit</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>


    )
  }
}

export default UserEdit
