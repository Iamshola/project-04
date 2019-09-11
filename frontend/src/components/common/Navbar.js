import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Navbar extends React.Component{

  constructor(){

    super()

    this.state = {
      navbarOpen: false,
      formData: {},
      dropdownOpen: false

    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  logout() {
    Auth.removeToken()
    Auth.removeUser()
    this.props.history.push('/')
  }

  toggleNavbar(){
    this.setState({navbarOpen: !this.state.navbarOpen})

  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen})
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        navbarOpen: false,
        dropdownOpen: false
      })
    }
  }

  render(){
    return(
      <nav className="navbar navbar-main is-fixed-top is-transparent">

        <div className="navbar-brand">
          <Link to="/" className="navbar-item title is-3 heading">Space</Link>
        </div>

        <div className="navbar-end">
          <a
            role="button"
            className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
            onClick={this.toggleNavbar}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/workspaces/" className="navbar-item ">Browse All Workspaces</Link>
            <Link to="/about/" className="navbar-item">About</Link>
            {Auth.isAuthenticated() && <Link to="/workspaces/new/" className="navbar-item">New Space</Link>}
          </div>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <Link to="/users/" className="navbar-item">Users</Link>}
            {!Auth.isAuthenticated() && <Link to="/register/" className="navbar-item">Register</Link>}
            {!Auth.isAuthenticated() && <Link to="/login/" className="navbar-item">Login</Link>}
            {Auth.isAuthenticated() && <div className="navbar-item">
              <div className={`dropdown is-right ${this.state.dropdownOpen ? 'is-active' : ''}`}>
                <Link to={`/users/${Auth.getUser()}/`} className="dropdown-item">My Profile</Link>
                <a className="dropdown-item"  onClick={this.logout}>Logout  </a>
              </div>
            </div>}

          </div>
        </div>

      </nav>
    )
  }




}


export default withRouter(Navbar)
