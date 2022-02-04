import React from 'react'

const ReviewTile = (props) => {
  const {heading, description, rating} = props.review
  return (
    <div className="reviews-tile">
      <div className="inside-spacing">
        <h1>{heading}</h1>
        <p>Description: {description}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  )
}

export default ReviewTile