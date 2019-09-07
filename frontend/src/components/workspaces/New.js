import React from 'react'
import Auth from '../../lib/Auth'
import axios from 'axios'
// import ReactFilestack from 'filestack-react'
//
// const options = {
//   accept: 'image/*',
//   options: {
//     resize: {
//       width: 100
//     }
//   },
//   transformations: {
//     crop: true,
//     circle: true,
//     rotate: true
//   }
// }

class WorkspacesNew  extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/workspaces/', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/workspaces/'))
      .catch(err => this.setState({ errors: err.response.data}))
  }

  handleChangeNormal(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }


  render() {
    console.log('heyy')
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h3> New Space </h3>
              <p className="subtitle">Lets Spread the word!</p>
              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <input
                      className="input"
                      name="name"
                      placeholder="eg: LoveExp Cafe"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                  </div>

                  <div className="field">
                    <label className="label">Address Line 1</label>
                    <input
                      className="input"
                      name="addressLine1"
                      placeholder="eg: LoveExp Cafe"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.address_line_1 && <small className="help is-danger">{this.state.errors.address_line_1}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Address Line 2</label>
                    <input
                      className="input"
                      name="addressLine2"
                      placeholder="eg: Love cafe street"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.address_line_2 && <small className="help is-danger">{this.state.errors.address_line_2}</small>}
                  </div>
                  <div className="field">
                    <label className="label">City</label>
                    <input
                      className="input"
                      name="addressCity"
                      placeholder="eg: London"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.city && <small className="help is-danger">{this.state.errors.city}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Post Code</label>
                    <input
                      className="input"
                      name="addressPostCode"
                      placeholder="SE16 6YY"
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
                      type="number"
                      name="opening_times_tue"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.opening_times_mon && <small className="help is-danger">{this.state.errors.opening_times_mon}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Opening Times - Tuesday</label>
                    <input
                      className="input"
                      type="number"
                      name="opening_times_tue"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.opening_times_tue && <small className="help is-danger">{this.state.errors.opening_times_tue}</small>}
                  </div>

                  <div className="field">
                    <label className="label">Opening Times - Wednesday</label>
                    <input
                      className="input"
                      type="number"
                      name="opening_times_wed"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.opening_times_wed && <small className="help is-danger">{this.state.errors.opening_times_wed}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Opening Times - Thursday</label>
                    <input
                      className="input"
                      type="number"
                      name="opening_times_thur"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.opening_times_thur && <small className="help is-danger">{this.state.errors.opening_times_thur}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Opening Times - Friday</label>
                    <input
                      className="input"
                      type="number"
                      name="opening_times_fri"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.opening_times_fri && <small className="help is-danger">{this.state.errors.opening_times_fri}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Opening Times - Saturday</label>
                    <input
                      className="input"
                      type="number"
                      name="opening_times_sat"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.opening_times_sat && <small className="help is-danger">{this.state.errors.opening_times_sat}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Opening Times - Saturday</label>
                    <input
                      className="input"
                      type="number"
                      name="opening_times_sun"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.opening_times_sun && <small className="help is-danger">{this.state.errors.opening_times_sun}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Genre</label>
                    <input
                      className="input"
                      type="number"
                      name="genre"
                      placeholder= "+442076507775"
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

      </section>
    )
  }
}

export default WorkspacesNew


// <div className="field">
//   <label className="label">Image</label>
//   <ReactFilestack
//     mode="transform"
//     apikey={fileloaderKey}
//     buttonText="Upload Photo"
//     buttonClass="button"
//     className="upload-image"
//     options={options}
//     onSuccess={(result) => this.handleUploadImages(result)}
//     preload={true}
//   />
//   {this.state.formData.image && <img src={this.state.formData.image} />}
// </div>
