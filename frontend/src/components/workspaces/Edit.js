import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Select from 'react-select'
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

const genreOptions = [
  { value: '', label: 'All' },
  { value: 'Animal Friendly', label: 'Animal Friendly' },
  { value: 'Quiet Section', label: 'Quiet Section' },
  { value: 'Meeting Tables', label: 'Meeting Tables' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'Music', label: 'Music' },
  { value: 'Food and Drinks Permitted', label: 'Food and Drinks Permitted' },
  { value: 'Free', label: 'Free' },
  { value: 'Wheelchair accessible', label: 'Wheelchair accessible' }
]

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
    this.handleMultiChange = this.handleMultiChange.bind(this)

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

  handleMultiChange(selectedOptions, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOptions.map(selectedOption => selectedOption.value)}
    this.setState({ formData })
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  componentDidMount() {
    axios.get(`/api/workspaces/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  render() {
    const selectedGenre = (this.state.formData.genre || []).map(genre => ({ label: genre, value: genre }))
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="box is-light edit-page">

              <form onSubmit={this.handleSubmit}>
                <h3 className="title is-2">Edit</h3>
                <div className="columns">
                  <div className="column is-4">
                    <div className="box is-light">
                      <h1>Preview:</h1>
                      <h3>See Your Changes</h3>
                      <figure className="image display">
                        <img src={this.state.formData.image} alt="Placeholder image" />
                      </figure>
                      <hr />
                      <p>{this.state.formData.city}, {this.state.formData.postcode}</p>
                      <hr />
                      <p>Link: {this.state.formData.link}</p>
                      <hr />
                    </div>
                  </div>
                  <div className="column is-4">
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
                      <Select
                        isMulti
                        value={selectedGenre}
                        name="genre"
                        options={genreOptions}
                        onChange={this.handleMultiChange}
                      />
                      {this.state.errors.genre && <small className="help is-danger">{this.state.errors.genre}</small>}
                    </div>
                    </div>
                    <div className="column is-4">
                      <div className="field">
                        <label className="label">Opening Times - Monday</label>
                        <input
                          className="input"
                          type="text"
                          name="opening_times_mon"
                          placeholder= "08:00 - 22:30"
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
                          placeholder= "08:00 - 22:30"
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
                        placeholder= "08:00 - 22:30"
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
                        placeholder= "08:00 - 22:30"
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
                        placeholder= "08:00 - 22:30"
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
                        placeholder= "08:00 - 22:30"
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
                        placeholder= "08:00 - 22:30"
                        value={this.state.formData.opening_times_sun || ''}
                        onChange={this.handleChangeNormal}
                      />
                      {this.state.errors.opening_times_sun && <small className="help is-danger">{this.state.errors.opening_times_sun}</small>}
                    </div>
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
                      {this.state.formData.image && <img src={this.state.formData.image} />}
                    </div>
                  </div>


                </div>

                <button className="login-btn">
                Submit
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

    )
  }
}

export default WorkspacesEdit
