import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import UserCard from './UserCard'
import NotFound from '../common/NotFound'

class UserIndex extends React.Component{


  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('/api/users/')
      .then(res => {
        this.setState({ users: res.data})
      })
  }

  render() {
    console.log(this.state.users, 'hey ther')


    if(!this.state.users) return <NotFound/>
    return(
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container has-text-centered">
            <section className="hero new">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title is-2 heading">Users</h1>
                </div>
              </div>
            </section>
            <div className="box is-light">
              <div className="column">
                <div className="columns is-multiline">
                  {this.state.users.map(user =>
                    <div key={user.id} className="column is-half-tablet is-one-quarter-desktop">
                      <Link to={`/users/${user.id}`}>
                        <UserCard {...user} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

    )
  }

}


export default UserIndex
