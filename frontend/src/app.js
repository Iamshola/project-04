import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'

import { HashRouter, Route, Switch } from 'react-router-dom'
import SecureRoute from './components/common/SecureRoute'

import axios from 'axios'
import './style.scss'

import Navbar from './components/common/Navbar.js'
import NotFound from './components/common/NotFound.js'
import Home from './components/pages/Home.js'
import WorkspacesIndex from './components/workspaces/Index.js'
import WorkspacesShow from './components/workspaces/Show.js'
import WorkspacesNew from './components/workspaces/New.js'
import WorkspacesEdit from './components/workspaces/Edit.js'

import UserIndex from './components/user/UserIndex.js'
import UserShow from './components/user/UserShow.js'


import Footer from './components/common/Footer.js'

import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'



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

        <ToastContainer position="bottom-right" hideProgressBar={true} />
        <Switch>

          <SecureRoute path="/workspaces/:id/edit" component={WorkspacesEdit} />
          <SecureRoute path="/workspaces/new" component={WorkspacesNew} />
          <Route path="/workspaces/:id" component={WorkspacesShow} />
          <Route exact path="/workspaces" component={WorkspacesIndex} />

          <Route exact path="/users/:id" component={UserShow} />
          <Route exact path="/users" component={UserIndex} />

          <Route path="/notfound" component={NotFound} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Footer />

        </Switch>
      </HashRouter>

    )
  }

}



ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
