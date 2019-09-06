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
