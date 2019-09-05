import React from 'react'


const UserCard = ({ username, image}) => {


  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>


      <div className="card-content">
        <p className="title is-5">{username}</p>

        <br />
        <br />

        <hr/>

      </div>
    </div>


  )
}

export default UserCard
