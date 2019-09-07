import React from 'react'
import axios from 'axios'

class ShowUser extends React.Component {

  constructor() {
    super()

    this.state = {
      user: {}
    }

  }

  componentDidMount() {
    axios.get(`/api/workspaces/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
  }

  render() {
    console.log(this.state)
    return(
      <section className="hero is-light">
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
