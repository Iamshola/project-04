import React from 'react'
import axios from 'axios'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import Promise from 'bluebird'


// import Bookmark from '../common/Bookmark'

class Show extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      formData: {},
      workspaces: [],
      workspace: null,
      data: null,
      errors: {}
    }
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleNearby = this.handleNearby.bind(this)
    this.handleBookmark = this.handleBookmark.bind(this)
  }


  getWorkspaces() {
    Promise.props({
      workspace: axios.get(`/api/workspaces/${this.props.match.params.id}/ `).then(res => res.data),
      workspaces: axios.get('/api/workspaces/').then(res => res.data)
    })

      .then(res2 => this.setState({ workspace: res2.workspace, workspaces: res2.workspaces, formData: { content: '' }  }))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  componentDidMount() {
    this.getWorkspaces()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      axios.get(`/api/workspaces/${this.props.match.params.id}/`)
        .then(res => {
          this.setState({ workspace: res.data})
        })
    }
  }

  handleNearby(){
    const nearbyWorkspaces = this.state.workspaces.filter(workspace => workspace.address_line_2 === this.state.workspace.address_line_2 && workspace.name !== this.state.workspace.name )

    return nearbyWorkspaces

  }

  handleChangeContent(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }
  handleSubmit(e) {
    e.preventDefault()
    axios.post(`/api/workspaces/${this.props.match.params.id}/comments/`, this.state.formData,
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.getWorkspaces())

  }
  handleDelete(e) {
    e.preventDefault()

    axios.delete(`/api/workspaces/${this.props.match.params.id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/workspaces/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleDeleteComment(e) {
    axios.delete(`/api/workspaces/${this.props.match.params.id}/comments/${e.target.id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getWorkspaces())
  }

  handleChange(e){
    this.setState({ workspaces: e.target.value})
  }

  handleBookmark() {
    axios.post(`/api/workspaces/${this.props.match.params.id}/bookmarks/`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/users/'))
  }



  render(){

    console.log(this.state.workspace)

    if(!this.state.workspace) return null

    return(
      <div className="container">
        <section className="box showPage">

          <div className="columns">
            <div className="column">
              <h1 className="title is-1">  {this.state.workspace.name} </h1>
              <h2 className="subtitle"> {this.state.workspace.address_line_1}, {this.state.workspace.address_line_2}, {this.state.workspace.city} </h2>
              <a href={this.state.workspace.link}><p className="button title is-6 heading">Visit {this.state.workspace.name}'s link  </p></a>
              <br />
              <br />
              <div className="subtitle is-6">{this.state.workspace.description}  </div>

              {this.state.workspace.genres.map(workspace =>
                <li key={workspace.id}
                  className="subtitle is-6">
                  {workspace.name}  </li>
              )}

              {Auth.isCurrentUser() === this.state.workspace.user.id && <div className="buttons">
                <Link className="title is-6 heading button show edit" to={`/workspaces/${this.state.workspace.id}/edit/`}>Edit</Link>
                <Link to="" className="button show erase title is-6 heading" onClick={this.handleDelete}>Delete</Link>
                <button onClick={this.handleBookmark} className="button show title is-6 heading">Bookmark this location</button>
              </div>}
              <hr />
            </div>
          </div>




          <div className="columns">
            <div className="column is-6 is-offset-2">
              <div className="media-left">
                <figure className="image display">
                  <img src={this.state.workspace.image} alt="Placeholder image" />
                </figure>
              </div>
            </div>
            <div className="column">
              <h2 className="title is-4">Opening Times:</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th><abbr title="Position">Day</abbr></th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Monday</th>
                    <td>{this.state.workspace.opening_times_mon}:00 - {this.state.workspace.closing_times_mon}:00 </td>
                  </tr>
                  <tr>
                    <th>Tuesday</th>
                    <td>{this.state.workspace.opening_times_tue}:00 - {this.state.workspace.closing_times_tue}:00</td>
                  </tr>
                  <tr>
                    <th>Wednesday</th>
                    <td>{this.state.workspace.opening_times_wed}:00 - {this.state.workspace.closing_times_wed}:00</td>
                  </tr>
                  <tr>
                    <th>Thursday</th>
                    <td>{this.state.workspace.opening_times_thur}:00 - {this.state.workspace.closing_times_thur}:00</td>
                  </tr>
                  <tr>
                    <th>Friday</th>
                    <td>{this.state.workspace.opening_times_fri}:00 - {this.state.workspace.closing_times_fri}:00</td>
                  </tr>
                  <tr>
                    <th>Saturday</th>
                    <td>{this.state.workspace.opening_times_sat}:00 - {this.state.workspace.closing_times_sat}:00</td>
                  </tr>
                  <tr>
                    <th>Sunday</th>
                    <td>{this.state.workspace.opening_times_sun}:00 - {this.state.workspace.closing_times_sun}:00</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>


          <div className="columns">
            <div className="column">
              <h2 className="title is-5 heading">Comments</h2>
              <hr />
              <div className="tile is-parent">
                <div className="box tile is-child">
                  {this.state.workspace.comments.map(comment =>
                    <Comment
                      className="comment"
                      key={comment.id}
                      {...comment}
                      handleDeleteComment={this.handleDeleteComment} />
                  )}
                  {Auth.isAuthenticated() && <form onSubmit={this.handleSubmit}>
                    <div className="field">
                      <textarea
                        name="content"
                        className="textarea"
                        placeholder="Add a comment..."
                        onChange={this.handleChangeContent}
                        value={this.state.formData.content}
                      />
                    </div>
                    <button className="button title is-6 heading submit"> Submit</button>
                  </form>}
                </div>
              </div>
            </div>
          </div>


          <h2 className="title is-5 heading">Looking For Similar Spaces?</h2>
          <hr />
          <div className="columns is-multiline">
            <hr className="show-hr"/>

            {this.handleNearby().map(workspace =>
              <div key={workspace.id} className="column is-half-tablet is-one-quarter-desktop">
                <Link to={`/workspaces/${workspace.id}/`} key={workspace.id} >
                  <figure className="image is-16by9">
                    <img src={workspace.image} alt={workspace.name}/>
                  </figure>
                  <p>{workspace.name}</p>
                </Link>
              </div>
            )}
          </div>

        </section>
      </div>

    )
  }
}

export default Show
