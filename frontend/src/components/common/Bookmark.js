import React from 'react'




const Bookmark = ({ liked, handleBookmark }) => {
  const label = liked ? 'yass' : 'mope'


  return (
    <div>

      <button
        onClick={handleBookmark}
        className= "bookmark">
        {label}
      </button>
    </div>
  )
}
// 300 people have liked this
export default Bookmark
