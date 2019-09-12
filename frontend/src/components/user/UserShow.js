import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class ShowUser extends React.Component {

  constructor() {
    super()
    this.state = {
      user: {},
      bookmarks: []
    }

  }

  componentDidMount() {
    axios.get(`api/users/${this.props.match.params.id}/`, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ user: res.data }))
      .then(() => console.log('hello',this.state.user))
      .catch(err => console.error(err))
  }
  // console.log(this.state.user, 'users here')

  render() {
    if(!this.state.user) return null

    return(
      <section className="login is-fullheight">
        <div className="login-body">
          <div className="column is-white">
            <div className="container v-middle">

              <div className="columns login-page">
                <div className="column is-5 login-sidebar is-hidden-mobile">
                  <div className="login-gradient-background">
                  </div>
                </div>

                <div className="column is-6 login-form-wrapper usersShow">
                  <div className="column is-12 field-box">
                    <div className="column is-offset-1"><h1 className=" title is-4 heading has-text-centered">{this.state.user.username}, {this.state.user.user_city} </h1>

                      <figure className="image is-128x128">
                        <img className="is-rounded" src={this.state.user.image} alt={this.state.user.username}/>
                      </figure>
                      <br />
                      {Auth.getUser() && <div className="buttons">
                        <Link
                          className="button" to={`/users/${this.state.user.id}/edit`}>Edit</Link>
                        <Link to="/workspaces/new/" className="button">Any More Spaces to Recommend?</Link>
                      </div>}
                      <br />
                      <h1 className="title is-6 heading">Linkedin: <a href={this.state.user.linked_In_Link}> {this.state.user.username}</a></h1>
                      <h1 className="title is-6 heading">Interests:</h1> <p>{this.state.user.interest}</p>
                      <br/>
                      <div className="column">
                        <h1 className="title is-6 heading">Workspaces Entered:</h1>
                        <div className="columns is-multiline">
                          {this.state.user.workspaces && this.state.user.workspaces.map(workspace =>
                            <div key={workspace.id} className="column is-half-desktop is-one-quarter-desktop">
                              <Link to={`/workspaces/${workspace.id}/`} key={workspace.id} >
                                <figure className="image is-16by9">
                                  <img src={workspace.image} alt={workspace.name}/>
                                </figure>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default ShowUser
