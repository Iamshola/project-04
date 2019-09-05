import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route} from 'react-router-dom'



import axios from 'axios'
import './style.scss'
import Navbar from './components/common/Navbar.js'
import Home from './components/pages/Home.js'
import WorkspacesIndex from './components/workspaces/Index.js'



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

    if(!this.state.workspaces) return null
    return(
      <HashRouter>
        <Navbar />
        <Route exact path="/workspaces" component={WorkspacesIndex} />
        <Route exact path="/" component={Home} />
      </HashRouter>

    )
  }

}



ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
