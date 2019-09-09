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
    axios.get(`api/users/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ user: res.data })
      })
      .catch(err => console.error(err))
  }

  render() {
    console.log(this.state.user)
    return(
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <div className="box is-warning">
                <figure className="image is-3by3">
                  <img src={this.state.user.image} alt={this.state.user.username}/>
                </figure>

                <div className="box">

                  <div className="content">
                    <h2>{this.state.user.username}</h2>
                    <h2>{this.state.user.user_city}</h2>
                  </div>

                  {Auth.isAuthenticated() && <div className="buttons">
                    <Link className=" button edit" to={`/users/${this.state.user.id}/edit`}>Edit</Link>
                  </div>}

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
