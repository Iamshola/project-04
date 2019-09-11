import React from 'react'


const UserCard = ({ username, image, user_city, email}) => {


  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-3by2">
          <img src={image} alt={name} />
        </figure>
      </div>


      <div className="card-content">
        <p className="title is-4 heading">{username}</p>
        <hr/>
        <p className="is-5">{user_city}</p>
        <p className="is-5">{email}</p>

      </div>
    </div>


  )
}

export default UserCard
