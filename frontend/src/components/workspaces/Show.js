import React from 'react'
import axios from 'axios'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import Card from './Card'
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
    // this.handleBookmark = this.handleBookmark.bind(this)
  }


  getWorkspaces() {
    Promise.props({
      workspace: axios.get(`/api/workspaces/${this.props.match.params.id}/ `).then(res => res.data),
      workspaces: axios.get('/api/workspaces/').then(res => res.data)
    })
      .then(res => this.setState({ workspace: res.workspace, workspaces: res.workspaces }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  componentDidMount() {
    this.getWorkspaces()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getWorkspaces()
    }
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

  handleNearby(){
    const nearbyWorkspaces = this.state.workspaces.filter(workspace => workspace.city === this.state.workspaces.city && workspace.name !== this.state.workspaces.name)

    return nearbyWorkspaces

  }

  render(){
    console.log(this.state.workspace)
    console.log(this.state.workspaces)

    if(!this.state.workspace) return null

    return(
      <div className="container">
        <section className="box showPage">
          <h1 className="title">  {this.state.workspace.name} </h1>
          <h2 className="subtitle"> {this.state.workspace.address_line_1}, {this.state.workspace.address_line_2}, {this.state.workspace.city} </h2>
          <div className="subtitle is-6">{this.state.workspace.link}  </div>
          <div className="subtitle is-6">{this.state.workspace.description}  </div>

          {this.state.workspace.genres.map(workspace =>
            <li key={workspace.id}
              className="subtitle is-6">
              {workspace.name}  </li>
          )}

          {Auth.isAuthenticated() && Auth.isCurrentUser(this.state.workspace.user) && <div className="buttons">
            <Link className=" button edit" to={`/workspaces/${this.state.workspace.id}/edit/`}>Edit</Link>
            <Link to="" className="button erase" onClick={this.handleDelete}>Delete</Link>
          </div>}


          <div className="columns">
            <div className="column is-5">
              <div className="media-left">
                <figure className="image display">
                  <img src={this.state.workspace.image} alt="Placeholder image" />
                </figure>
              </div>
            </div>


            <div className="column is-3">
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
                    <td>{this.state.workspace.opening_times_mon}</td>
                  </tr>
                  <tr>
                    <th>Tuesday</th>
                    <td>{this.state.workspace.opening_times_tue}</td>
                  </tr>
                  <tr>
                    <th>Wednesday</th>
                    <td>{this.state.workspace.opening_times_wed}</td>
                  </tr>
                  <tr>
                    <th>Thursday</th>
                    <td>{this.state.workspace.opening_times_thur}</td>
                  </tr>
                  <tr>
                    <th>Friday</th>
                    <td>{this.state.workspace.opening_times_fri}</td>
                  </tr>
                  <tr>
                    <th>Saturday</th>
                    <td>{this.state.workspace.opening_times_sat}</td>
                  </tr>
                  <tr>
                    <th>Sunday</th>
                    <td>{this.state.workspace.opening_times_sun}</td>
                  </tr>
                </tbody>
              </table>
            </div>


            <div className="column is-2 nearby">
              <h2 className="title is-6 heading">Nearby Workspaces</h2>
              <hr className="show-hr"/>
              {this.handleNearby().map(workspace =>
                <Link to={`/workspaces/${workspace.id}`} key={workspace.id} >
                  <figure className="image is-16by9">
                    <img src={workspace.image} alt={workspace.name}/>
                  </figure>
                </Link>
              )}
            </div>

          </div>
          <div className="columns">
            <div className="column is-6">
              <div className="tile is-parent">
                <article className="comments tile is-child notification">
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
                    <button className="button"> Submit</button>
                  </form>}
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>

    )
  }
}

export default Show
