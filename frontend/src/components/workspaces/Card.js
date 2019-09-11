import React from 'react'


const Card = ({ name, city, postcode, image}) => {


  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-3by2">
          <img src={image} alt={name} />
        </figure>
      </div>


      <div className="card-content">
        <p className="title is-6 heading">{name}</p>
        <hr/>
        <p className="text is-12">{city}, <br />{postcode}</p>
      </div>
    </div>


  )
}

export default Card
