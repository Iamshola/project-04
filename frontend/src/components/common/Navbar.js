import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{

  constructor(){
    super()
    this.state = {
      workspaces: {},
      navbarOpen: false

    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar(){
    this.setState({navbarOpen: !this.state.navbarOpen})

  }

  render(){
    return(
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link to= "/" className="navbar-item"> Home </Link>
            <a role="button" className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''} ` } onClick={this.toggleNavbar}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>


          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''} ` }>
            <div className="navbar-end">
              <Link to= "/workspaces" className="navbar-item"> Spaces </Link>
              <Link to= "/users" className="navbar-item"> Users </Link>
              <Link to= "/register" className="navbar-item"> Register </Link>
              <Link to= "/login" className="navbar-item"> Login </Link>
            </div>
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="42" height="12"/>
          </div>
        </div>
      </nav>
    )
  }




}


export default Navbar
