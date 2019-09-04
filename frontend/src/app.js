import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './style.scss'

class App extends React.Component {

  componentDidMount(){
    axios.get('/api/workspaces')
      .then(res => {
        this.setState({ workspaces: res.data })
      })

  }

  render(){
    console.log(this.state)
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <h1>hello There</h1>
      </nav>
    )
  }

}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
