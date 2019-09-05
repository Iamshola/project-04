import React from 'react'

const Card = ({ name, image, abv, ph, tagline }) => {
  return (

    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={image} alt={name}/>
          </figure>
        </div>
        <div className="media-content">
          <div className="content">

            <h1>{name} </h1>
            <p className="subtitle">{tagline}</p>
            <p>ABV: {abv}</p>
            <p>pH: {ph}</p>
            <br />

          </div>

        </div>
      </article>
    </div>

  )
}
export default Card
