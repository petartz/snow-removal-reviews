import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"

const StarRating = ({ rating, ratingLabel }) => {

  let avgStarRating = []
  let wholeStars = Math.round(rating)
  let halfStars = Math.round(rating*2)/2-wholeStars
  for (let i = 0; i<wholeStars; i++) {
    avgStarRating.push(
      <FontAwesomeIcon icon={faStar} key={i}/>
    )
  }
  if (halfStars!==0) {
    avgStarRating.push(avgStarRating.push(<FontAwesomeIcon icon={faStarHalf} key={6}/>))
  }

  return (
    <div>
      {ratingLabel}: {avgStarRating}
    </div>
  )
}

export default StarRating