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
        this.setState({workspaces: res.data})
      })
  }


  render() {
    return(
      <section className="section">
        <div className="container">
          <p>Hiey there </p>
        </div>
      </section>

    )
  }

}



ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
