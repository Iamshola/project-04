import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './style.scss'


class App extends React.Component {

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
    return(
      <section className="section">
        <div className="container">
          <p>Hiey there </p>
          <p>{this.state.workspaces.name}</p>

        </div>
      </section>

    )
  }

}



ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
