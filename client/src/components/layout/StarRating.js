import React from 'react'

const StarRating = ({ rating, ratingLabel }) => {
  
  let avgStarRating = []
  let wholeStars = Math.floor(rating)
  let halfStars = Math.round(rating*2)/2-wholeStars
  for (let i = 0; i<wholeStars; i++) {
    avgStarRating.push(
      <i className="fas fa-star"></i>
    )
  }
  if (halfStars!==0) {
    avgStarRating.push(<i className="fas fa-star-half"></i>)
  }
 
  return ( 
    <div>
      {ratingLabel}: {avgStarRating}
    </div>
  )
}

export default StarRating