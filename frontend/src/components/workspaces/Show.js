import React from 'react'
import axios from 'axios'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
// import Bookmark from '../common/Bookmark'

class Show extends React.Component{

  constructor(){
    super()
    this.state = {
      formData: {
        marked: false
      },
      markcount: null
    }

    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleBookmark = this.handleBookmark.bind(this)

  }

  componentDidMount() {
    axios
      .get(`api/workspaces/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ workspace: res.data })
      })
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
      .then(res => this.setState({ workspace: res.data }))
  }

  handleDelete(e) {
    e.preventDefault()

    axios.delete(`/api/workspaces/${this.props.match.params.id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/workspaces/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))

    console.log(e.target.value)
  }


  handleDeleteComment(e) {
    axios.delete(`/api/workspaces/${this.props.match.params.id}/comments/${e.target.id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ workspace: res.data }))
  }

  handleBookmark() {
    axios.post(`/api/workspaces/${this.props.match.params.id}/bookmark`, null, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ workspace: res.data }))
  }

  isBookmarked(marks) {
    return marks.includes(Auth.getPayload().sub)
  }


  render(){
    if(!this.state.workspace) return null
    return(
      <div className="columns">
        <div className="column">
          <section className="hero is-medium">
            <div className="hero-body">
              <h1 className="title">  {this.state.workspace.name} </h1>
              <h2 className="subtitle"> {this.state.workspace.address_line_1}, {this.state.workspace.address_line_2}, {this.state.workspace.city} </h2>
              <div className="subtitle is-6">{this.state.workspace.description}  </div>
              {Auth.isAuthenticated() && <div className="buttons">
                <Link className=" button edit" to={`/workspaces/${this.state.workspace.id}/edit`}>Edit</Link>
                <Link className="button erase" onClick={this.handleDelete}>Delete</Link>

              </div>}

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
                <div>
                  <p> Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>


              <div className="column">
                {this.state.workspace.comments.map(comment =>
                  <Comment
                    className="comment"
                    key={comment.id}
                    {...comment}
                    handleDeleteComment={this.handleDeleteComment} />
                )}

                <div className="column is-6">
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
                </div>
              </div>

              <div className="container">
                <h2 className="title is-6 pool-heading">Nearby</h2>
                <hr className="show-hr"/>



              </div>
            </div>

          </section>
        </div>
      </div>

    )
  }
}

export default Show


// handleBookmark() {
//   axios.post(`/api/workspaces/${this.props.match.params.id}/bookmark`, null, {
//     headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
//   })
//     .then(res => this.setState({ workspace: res.data }))
// }
//
// isBookmarked(marks) {
//   return marks.includes(Auth.getPayload().sub)
// }
//
// div className="columns is-multiline">
//   {Auth.isAuthenticated() && <div className="buttons">
//     <Bookmark
//       liked={this.isLiked(this.state.workspace.bookmarks)}
//       handleBookmark={this.handleBookmark}
//     />
//     <p className="subtitle">{this.state.worspace.bookmarks.length} like </p>
//   </div>}
