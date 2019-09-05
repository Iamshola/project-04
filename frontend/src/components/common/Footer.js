import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="navbar">
      <div className="container">
        <div className="navbar-item">
          <Link to="/">About</Link>
        </div>
        <div className="navbar-item">
          <Link to="/">Contact Us</Link>
        </div>
        <div className="navbar-item">
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
