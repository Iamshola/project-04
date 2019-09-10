import React from  'react'
import Auth from '../../lib/Auth'


const Comment = ({ user, content, id, created_at, handleDeleteComment}) => {
  // console.log(Comment.content)
  return (
    <section className="section1 comment">
      <div className="columns comment">

        <div className="column comment is-2">
          <div className="media-left">
            <figure className="image is-48x48">
              <img className="is-rounded" src={user.image} alt="Placeholder image" />
            </figure>
          </div>
        </div>

        <div className="column comment is-9">
          <div className="content">
            <strong className="subtitle is-10">{user.username}</strong>
            <br />
            <div>

              {' '}
              <small>{(new Date(created_at)).toLocaleDateString()}</small>
              <br/>
              <div className="subtitle comment">
                {content}
              </div>
            </div>

          </div>
        </div>

        <div className="column comment">
          <div className="content">
            {Auth.isAuthenticated() && <div className="media-right">
              <button className="delete" id={id} onClick={handleDeleteComment}></button>
              <br />
              <br />
            </div>}

            <br />
            <br />
          </div>
        </div>
      </div>

    </section>
  )
}

export default Comment
