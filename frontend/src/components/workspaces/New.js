import React from 'react'
import Auth from '../../lib/Auth'
import axios from 'axios'
import Select from 'react-select'
import ReactFilestack from 'filestack-react'

const FilestackToken = process.env.FilestackToken


const genreOptions = [
  { label: 'All', value: '' },
  { label: 'Animal Friendly', value: 1 },
  { label: 'Quiet Section', value: 2 },
  { label: 'Meeting Tables', value: 3  },
  { label: 'Wifi', value: 4 },
  { label: 'Food and Drinks Permitted', value: 5 },
  { label: 'Free',  value: 6 },
  { label: 'Wheelchair accessible', value: 7 }
]

const options = {
  accept: 'image/*',
  options: {
    resize: {
      width: 100
    }
  },
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}

class WorkspacesNew extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeNormal = this.handleChangeNormal.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
    this.handleUploadImages = this.handleUploadImages.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = { ...this.state.formData, genres: this.state.formData.genres.map(genre => genre.id) }
    console.log(data)

    axios.post('/api/workspaces/', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/workspaces/'))
      .catch(err => this.setState({ errors: err.response.data}))
  }

  handleMultiChange(selectedOptions, data) {
    const options = selectedOptions.map(option => ({ name: option.label, id: option.value }))
    const formData = { ...this.state.formData, [data.name]: options}
    this.setState({ formData })
  }

  handleChangeNormal(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  render() {
    console.log(this.state.errors)

    return (
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container has-text-centered">
            <section className="hero new">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title is-2 heading">New Space</h1>
                </div>
              </div>
            </section>
            <div className="box is-light">
              <form onSubmit={this.handleSubmit}>
                <div className="columns">
                  <div className="column is-5">
                    <div className="field">
                      <label className="label">Name</label>
                      <input
                        className="input"
                        name="name"
                        placeholder="eg: Work Cafe"
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                    </div>

                    <div className="field">
                      <label className="label">Address Line 1</label>
                      <input
                        className="input"
                        name="address_line_1"
                        placeholder="eg: Work Cafe str"
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.address_line_1 && <small className="help is-danger">{this.state.errors.address_line_1}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Address Line 2</label>
                      <input
                        className="input"
                        name="address_line_2"
                        placeholder="eg: Workington"
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.address_line_2 && <small className="help is-danger">{this.state.errors.address_line_2}</small>}
                    </div>
                    <div className="field">
                      <label className="label">City</label>
                      <input
                        className="input"
                        name="city"
                        placeholder="eg: London"
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.city && <small className="help is-danger">{this.state.errors.city}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Post Code</label>
                      <input
                        className="input"
                        name="postcode"
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
                      <label className="label">Genre</label>
                      <Select
                        isMulti
                        name="genres"
                        options={genreOptions}
                        onChange={this.handleMultiChange}
                      />
                      {this.state.errors.genre && <small className="help is-danger">{this.state.errors.genre}</small>}
                    </div>
                  </div>
                  <div className="columns is-1">
                    <div className="column">
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-offset-4">
                      <table className="table">
                        <thead>
                          <tr>
                            <th><abbr title="Position"></abbr></th>
                            <th>Opening Times</th>
                            <th>Closed Times</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Monday</th>
                            <td>
                              <input
                                className="input"
                                type="number"
                                name="opening_times_mon"
                                placeholder= "08:00"
                                onChange={this.handleChangeNormal}
                              />
                              {this.state.errors.opening_times_mon && <small className="help is-danger">{this.state.errors.opening_times_mon}</small>}
                            </td>
                            <td>
                              <div className="field">
                                <input
                                  className="input"
                                  type="number"
                                  name="closing_times_mon"
                                  placeholder= "22:00"
                                  onChange={this.handleChangeNormal}
                                />
                                {this.state.errors.closing_times_mon && <small className="help is-danger">{this.state.errors.closing_times_mon}</small>}
                              </div>
                            </td>

                          </tr>
                          <tr>
                            <th>Tuesday</th>
                            <td>
                              <input
                                className="input"
                                type="number"
                                name="opening_times_tue"
                                placeholder= "08:00"
                                onChange={this.handleChangeNormal}
                              />
                              {this.state.errors.opening_times_tue && <small className="help is-danger">{this.state.errors.opening_times_tue}</small>}
                            </td>
                            <td>
                              <div className="field">

                                <input
                                  className="input"
                                  type="number"
                                  name="closing_times_tue"
                                  placeholder= "22:30"
                                  onChange={this.handleChangeNormal}
                                />
                                {this.state.errors.closing_times_tue && <small className="help is-danger">{this.state.errors.closing_times_tue}</small>}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>Wednesday</th>
                            <td>
                              <input
                                className="input"
                                type="number"
                                name="opening_times_wed"
                                placeholder= "08:00"
                                onChange={this.handleChangeNormal}
                              />
                              {this.state.errors.opening_times_wed && <small className="help is-danger">{this.state.errors.opening_times_wed}</small>}
                            </td>


                            <td>
                              <div className="field">
                                <input
                                  className="input"
                                  type="number"
                                  name="closing_times_wed"
                                  placeholder= "22:30"
                                  onChange={this.handleChangeNormal}
                                />
                                {this.state.errors.closing_times_wed && <small className="help is-danger">{this.state.errors.closing_times_wed}</small>}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>Thursday</th>
                            <td>
                              <input
                                className="input"
                                type="number"
                                name="opening_times_thur"
                                placeholder= "08:00"
                                onChange={this.handleChangeNormal}
                              />
                              {this.state.errors.opening_times_thur && <small className="help is-danger">{this.state.errors.opening_times_thur}</small>}
                            </td>
                            <td>
                              <div className="field">
                                <input
                                  className="input"
                                  type="number"
                                  name="closing_times_thur"
                                  placeholder= "22:30"
                                  onChange={this.handleChangeNormal}
                                />
                                {this.state.errors.closing_times_thur && <small className="help is-danger">{this.state.errors.closing_times_thur}</small>}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>Friday</th>
                            <td>
                              <input
                                className="input"
                                type="number"
                                name="opening_times_fri"
                                placeholder= "08:00"
                                onChange={this.handleChangeNormal}
                              />
                              {this.state.errors.opening_times_fri && <small className="help is-danger">{this.state.errors.opening_times_fri}</small>}
                            </td>


                            <td>
                              <div className="field">

                                <input
                                  className="input"
                                  type="number"
                                  name="closing_times_fri"
                                  placeholder= "22:30"
                                  onChange={this.handleChangeNormal}
                                />
                                {this.state.errors.closing_times_fri && <small className="help is-danger">{this.state.errors.closing_times_fri}</small>}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>Saturday</th>
                            <td>
                              <input
                                className="input"
                                type="number"
                                name="opening_times_sat"
                                placeholder= "08:00"
                                onChange={this.handleChangeNormal}
                              />
                              {this.state.errors.opening_times_sat && <small className="help is-danger">{this.state.errors.opening_times_sat}</small>}
                            </td>


                            <td>
                              <div className="field">

                                <input
                                  className="input"
                                  type="number"
                                  name="closing_times_sat"
                                  placeholder= "22:30"
                                  onChange={this.handleChangeNormal}
                                />
                                {this.state.errors.closing_times_sat && <small className="help is-danger">{this.state.errors.closing_times_sat}</small>}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>Sunday</th>
                            <td>
                              <input
                                className="input"
                                type="number"
                                name="opening_times_sun"
                                placeholder= "08:00 "
                                onChange={this.handleChangeNormal}
                              />
                              {this.state.errors.opening_times_sun && <small className="help is-danger">{this.state.errors.opening_times_sun}</small>}
                            </td>


                            <td>
                              <div className="field">
                                <input
                                  className="input"
                                  type="number"
                                  name="closing_times_sun"
                                  placeholder= "22:30"
                                  onChange={this.handleChangeNormal}
                                />
                                {this.state.errors.closing_times_sun && <small className="help is-danger">{this.state.errors.closing_times_sun}</small>}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="field">
                        <label className="label">Link</label>
                        <input
                          className="input"
                          type="text"
                          name="link"
                          placeholder= "This could be social media, website etc"
                          onChange={this.handleChangeNormal}
                        />
                        {this.state.errors.link && <small className="help is-danger">{this.state.errors.link}</small>}
                      </div>
                      <div className="field">
                        <label className="label">Image</label>
                        <ReactFilestack
                          mode="transform"
                          apikey={FilestackToken}
                          buttonText="Upload Photo"
                          buttonClass="button"
                          className="MultifileUpload"
                          options={options}
                          onSuccess={(result) => this.handleUploadImages(result)}
                          preload={true}
                        />
                        {this.state.formData.image && <img src={this.state.formData.image} />}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="login-btn">Submit</button>
              </form>
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default WorkspacesNew
