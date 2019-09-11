import React from 'react'

import Footer from '../common/Footer'

const Home = ()=> {
  return(
    <div>
      <section className="hero is-large">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column"></div>
              <div className="column"></div>
              <div className="column">
                <h1 className="title is-1 heading">Space</h1>
                <h1 className="subtitle is-3 heading">Making Space</h1>
              </div>
            </div>
          </div>
        </div>
      </section>




      <div className="container">
        <div className="columns">
          <div className="column">
            <h4 className="subtitle">CONTACT US:</h4>
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
            <h4 className="subtitle">NEWSLETTER:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
            <input/>
            <button>Submit</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>

  )
}

export default Home
