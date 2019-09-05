import React from 'react'
import axios from 'axios'


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
    console.log(this.state.workspaces)
    if(!this.state.workspaces) return null
    return(
      <section className="section">
        <div className="container">
          <p>Hiey there </p>

          {this.state.workspaces.map(workspace =>
            <div key={workspace._id} >
              <p>{workspace.name}, {workspace.address_line_1}</p>
            </div>
          )}

        </div>
      </section>

    )
  }

}


export default WorkspacesIndex
