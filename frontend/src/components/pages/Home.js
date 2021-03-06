import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '../common/Footer'

const Home = ()=> {
  return(
    <div>
      <section className="hero is-large main-hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column"></div>
              <div className="column"></div>
              <div className="column homepage">
                <h1 className="title is-1 heading"> SPACE</h1>
                <Link to="/about/" className="button title is-4 heading">Find out what it's all about.</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hero is-medium">
        <div className="hero-body moreAbout">
          <div className="container">
            <h1 className="title">  More About Us </h1>
            <div className="subtitle is-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            </div>
          </div>
        </div>
      </section>



      <section className="hero is-small">
        <div className="hero-body furtherContact">
          <div className="container ">
            <div className="columns">
              <div className="column">
                <h4 className="title is-6 heading">CONTACT US:</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                <ul>
                  <li>A :  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod </li>
                  <li>P :  123 456 7890 </li>
                  <li>E :  info@travel.com </li>
                </ul>
              </div>

              <div className="column">
                <p></p>
              </div>
              <div className="column">
                <h4 className="title is-6 heading">NEWSLETTER:</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                <input/>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>

  )
}

export default Home
