import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

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

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  render() {
    console.log(this.state.formData)
    console.log(this.state.errors, 'errors')
    return (
      <section className="hero is-light user_edit">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h3 className="title is-2">My Profile</h3>
            <div className="columns">
              <div className="column">
                <div className="box is-light">
                  <h1 className="title is-2">{this.state.formData.username}</h1>
                  <figure className="image is-128x128">
                    <img src="https://bulma.io/images/placeholders/128x128.png"/>
                  </figure>
                </div>
              </div>
            </div>

            <div className="box is-light">

              <form onSubmit={this.handleSubmit}>
                <div className="columns">
                  <div className="column is-4">
                    <div className="field">
                      <label className="label">City</label>
                      <input
                        className="input"
                        name="user_city"
                        placeholder="eg: LoveExp Cafe"
                        value={this.state.formData.user_city || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.user_city && <small className="help is-danger">{this.state.errors.user_city}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Interest</label>
                      <textarea
                        className="textarea"
                        name="interest"
                        placeholder="Great Place love it!"
                        value={this.state.formData.interest || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.interest && <small className="help is-danger">{this.state.errors.interest}</small>}
                    </div>
                  </div>

                  <div className="column is-4">
                    <div className="field">
                      <label className="label">Linkedin Link</label>
                      <input
                        className="input"
                        name="linked_In_Link"
                        placeholder="eg: LoveExp Cafe"
                        value={this.state.formData.linked_In_Link|| ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.linked_In_Link && <small className="help is-danger">{this.state.errors.linked_In_Link}</small>}
                    </div>
                    <button className="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    )
  }
}

export default UserEdit
