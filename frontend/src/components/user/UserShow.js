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
                    <h1>{this.state.user.username}</h1>

                    <figure className="image is-128x128">
                      <img src={this.state.user.image} alt={this.state.user.username}/>
                    </figure>
                    {Auth.getUser() && <div className="buttons">
                      <Link
                        className="button"
                        to={`/users/${this.state.user.id}/edit`}
                      >Edit</Link>
                    </div>}
                  </div>

                </div>

                <div className="column is-7 login-form-wrapper">
                  <div className="column is-12 field-box">
                    <div className="column is-7 is-offset-1">
                      <h1 className="title">City: {this.state.user.user_city}</h1>
                      <h1>Linkedin: <a href={this.state.user.linked_In_Link}> <br /> {this.state.user.linked_In_Link}</a></h1>
                      <h1>Interest: {this.state.user.interest}</h1>


                      <br/>


                      <div className="column">
                        <h1 className="title is-6 heading">Workspaces Entered:</h1>
                        <div className="columns is-multiline">
                          {this.state.user.workspaces && this.state.user.workspaces.map(workspace =>
                            <div key={workspace.id} className="column is-half-tablet is-one-quarter-desktop">
                              <Link to={`/workspaces/${workspace.id}/`} key={workspace.id} >
                                <figure className="image is-16by9">
                                  <img src={workspace.image} alt={workspace.name}/>
                                </figure>
                              </Link>
                            </div>
                          )}
                        </div>
                        <Link to="/workspaces/new/" className="navbar-item">Any More Spaces to Recommend?</Link>
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
