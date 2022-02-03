import React from 'react'
import Vote from "./Vote.js"

const ReviewTile = (props) => {
  const {heading, description, rating} = props.review
  return (
    <div className="reviews-tile">
      <div className="inside-spacing">
        <h1>{heading}</h1>
        <p>{description}</p>
        <p>{rating}</p>
      </div>
      <Vote reviewId={props.review.id}/>
    </div>
  )
}

export default ReviewTile