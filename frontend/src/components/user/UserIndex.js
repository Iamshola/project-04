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
    axios.get('/api/workspaces/')
      .then(res => {
        this.setState({ users: res.data.user})
      })
  }

  render() {
    console.log(this.state.users, 'hey')
    if(!this.state.users) return <NotFound/>
    return(
      <section className="section">
        <div className="container">
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
      </section>

    )
  }

}


export default UserIndex
