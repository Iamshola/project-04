import React from 'react'

const Bookmark = ({ bookmarked, handleBookmark }) => {
  const label = bookmarked ? 'hi' : 'bye'

  return (
    <div>

      <button onClick={handleBookmark} className= "bookmark">  {label} </button>
    </div>
  )
}
// 300 people have bookmarked this
export default Bookmark
