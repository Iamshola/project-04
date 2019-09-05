import React from 'react'


const Card = ({ name, city, postcode, image}) => {


  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>


      <div className="card-content">
        <p className="title is-5">{name}</p>

        <br />
        <br />

        <hr/>
        <p className="text is-12">{city}, {postcode}</p>
      </div>
    </div>


  )
}

export default Card
