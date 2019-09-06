import React from 'react'
import axios from 'axios'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'

class Show extends React.Component{

  constructor(){
    super()
    this.state = {
      formData: {}
    }

  }

  componentDidMount() {
    axios
      .get(`api/workspaces/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ workspace: res.data })
      })
  }


  render(){
    console.log('formData')
    if(!this.state.workspace) return null
    return(
      <div className="container">
        <div className="columns">
          <div className="column is-6">
            <section className="hero is-medium">
              <div className="hero-body">
                <h1 className="title">  {this.state.workspace.name} </h1>
                <div className="subtitle is-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="column">
                  <h2>Opening Times:</h2>
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
                  <article className="comments tile is-child notification">
                    {this.state.workspace.comments.map(comment =>
                      <Comment
                        className="comment"
                        key={comment.id}
                        {...comment}
                        handleDeleteComment={this.handleDeleteComment} />
                    )}
                    {Auth.isAuthenticated() && <form>
                      <div className="field">
                        <textarea
                          name="content"
                          className="textarea"
                          placeholder="Add a comment..."
                          value={this.state.formData.content}
                        />
                      </div>
                      <button className="button"> Submit</button>
                    </form>}
                  </article>

                </div>
              </div>

              <div className="column">
                <div className="tile">

                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }




}


export default Show
