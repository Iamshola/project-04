import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from './Card'


class WorkspacesIndex extends React.Component{


  constructor() {
    super()
    this.state = {
      workspaces: []
    }

  }

  componentDidMount() {
    axios.get('/api/workspaces')
      .then(res => {
        this.setState({ workspaces: res.data})
      })
  }


  render() {
    if(!this.state.workspaces) return null
    return(
      <section className="section">
        <div className="container">
          <br />
          <div className=" ">
            <div className="toggle-buttons">
              <Link to={'/workspaces/'}> <a className="view-buttons">List View</a> </Link>
              <Link to={'/users/'}> <a className="view-buttons">Map View</a> </Link>
            </div>
            <hr />
          </div>

          <div className="columns is-multiline">
            {!this.state.workspaces && <h2 className="title is-2">Loading...</h2>}
            {this.state.workspaces.map(workspaces =>
              <div key={workspaces.id} className="column is-half-tablet is-one-quarter-desktop">
                <Link to={`/workspaces/${workspaces.id}`}>
                  <Card {...workspaces} />
                </Link>
              </div>
            )}

          </div>


        </div>
      </section>

    )
  }

}


export default WorkspacesIndex
