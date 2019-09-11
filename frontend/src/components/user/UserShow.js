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
      .then(res => {
        this.setState({ user: res.data })
      })
      .catch(err => console.error(err))
  }

  render() {
    console.log(this.state.user, 'users here')


    return(
      <section className="login is-fullheight">
        <div className="login-body">
          <div className="column is-white">
            <div className="container v-middle">
              <div className="columns login-page">
                <div className="column is-5 login-sidebar is-hidden-mobile">
                  <div className="login-gradient-background">
                    <h1>{this.state.user.username}</h1>
                    <figure className="image is-1by1">
                      <img src={this.state.user.image} alt={this.state.user.username}/>
                    </figure>
                  </div>
                </div>

                <div className="column is-7 login-form-wrapper">
                  <div className="column is-12 field-box">
                    <div className="column is-7 is-offset-1">
                      <h1 className="title">City: {this.state.user.city}</h1>
                      <h1>Linkedin:{this.state.user.linked_In_Link}</h1>
                      <h1>Interest{this.state.user.interest}</h1>
                      <h1>Workspaces Entered:</h1>

                      <br/>
                      {Auth.getUser() && <div className="buttons">
                        <Link
                          className="button"
                          to={`/profiles/${this.state.user._id}/edit`}
                        >Edit</Link>
                      </div> }
                      <Link to="/workspaces/new/" className="navbar-item">Any More Spaces to Recommend?</Link>
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
