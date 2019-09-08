import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

// const options = {
//   accept: 'image/*',
//   transformations: {
//     crop: true,
//     circle: true,
//     rotate: true
//   }
// }

class WorkspacesEdit extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {},
      file: null
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

    axios.put(`/api/workspaces/${this.props.match.params.id}/`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/workspaces/${this.props.match.params.id}/`))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  componentDidMount() {
    axios.get(`/api/workspaces/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  render() {
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="columns">
              <div className="column is-4 is-offset-4">

                <h3 className="title is-2">We all make mistakes...</h3>

                <div className="box is-light">

                  <form onSubmit={this.handleSubmit}>
                    <div className="field">
                      <label className="label">Name</label>
                      <input
                        className="input"
                        name="name"
                        placeholder="eg: LoveExp Cafe"
                        value={this.state.formData.name || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                    </div>

                    <div className="field">
                      <label className="label">Address Line 1</label>
                      <input
                        className="input"
                        name="address_line_1"
                        placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
                        value={this.state.formData.address_line_1 || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.address_line_1 && <small className="help is-danger">{this.state.errors.address_line_1}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Address Line 2</label>
                      <input
                        className="input"
                        name="address_line_2"
                        placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
                        value={this.state.formData.address_line_2 || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.address_line_2 && <small className="help is-danger">{this.state.errors.address_line_2}</small>}
                    </div>
                    <div className="field">
                      <label className="label">City</label>
                      <input
                        className="input"
                        name="city"
                        placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
                        value={this.state.formData.city || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.city && <small className="help is-danger">{this.state.errors.city}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Post Code</label>
                      <input
                        className="input"
                        name="postcode"
                        placeholder="eg: se16 6yy"
                        value={this.state.formData.postcode || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.postcode && <small className="help is-danger">{this.state.errors.postcode}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Description</label>
                      <textarea
                        className="textarea"
                        name="description"
                        placeholder="Great Place love it!"
                        value={this.state.formData.description || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Opening Times - Monday</label>
                      <input
                        className="input"
                        type="text"
                        name="opening_times_mon"
                        placeholder= "+442076507775"
                        value={this.state.formData.opening_times_mon || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_mon && <small className="help is-danger">{this.state.errors.opening_times_mon}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Opening Times - Tuesday</label>
                      <input
                        className="input"
                        type="text"
                        name="opening_times_tue"
                        placeholder= "+442076507775"
                        value={this.state.formData.opening_times_tue || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_tue && <small className="help is-danger">{this.state.errors.opening_times_tue}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Opening Times - Wednesday</label>
                      <input
                        className="input"
                        type="text"
                        name="opening_times_wed"
                        placeholder= "+442076507775"
                        value={this.state.formData.opening_times_wed || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_wed && <small className="help is-danger">{this.state.errors.opening_times_wed}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Opening Times - Thursday</label>
                      <input
                        className="input"
                        type="text"
                        name="opening_times_thur"
                        placeholder= "+442076507775"
                        value={this.state.formData.opening_times_thur || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_thur && <small className="help is-danger">{this.state.errors.opening_times_thur}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Opening Times - Friday</label>
                      <input
                        className="input"
                        type="text"
                        name="opening_times_fri"
                        placeholder= "+442076507775"
                        value={this.state.formData.opening_times_fri || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_fri && <small className="help is-danger">{this.state.errors.opening_times_fri}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Opening Times - Saturday</label>
                      <input
                        className="input"
                        type="text"
                        name="opening_times_sat"
                        placeholder= "+442076507775"
                        value={this.state.formData.opening_times_sat || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_sat && <small className="help is-danger">{this.state.errors.opening_times_sat}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Opening Times - Sunday</label>
                      <input
                        className="input"
                        type="text"
                        name="opening_times_sun"
                        placeholder= "+442076507775"
                        value={this.state.formData.opening_times_sun || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_sun && <small className="help is-danger">{this.state.errors.opening_times_sun}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Link</label>
                      <input
                        className="input"
                        type="text"
                        name="link"
                        value={this.state.formData.link || ''}
                        placeholder= "This could be social media, website etc"
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.link && <small className="help is-danger">{this.state.errors.link}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Genre</label>
                      <input
                        className="input"
                        type="text"
                        name="genre"
                        value={this.state.formData.genre || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.genre && <small className="help is-danger">{this.state.errors.genre}</small>}
                    </div>
                    <button className="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
  }
}

export default WorkspacesEdit
