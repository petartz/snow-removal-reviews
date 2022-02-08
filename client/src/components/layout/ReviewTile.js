import React from 'react'
import Vote from "./Vote.js"

const ReviewTile = (props) => {
  const {heading, description, rating, id, voteCount } = props.review
  
  const handleDeleteClick = () => {
    props.deleteYourReview(id)
  }

  let deleteButtonElement = null
  if (props.user) {
    if (props.user.id === props.review.userId) {
      deleteButtonElement = <button onClick={handleDeleteClick}> 
          Delete Review
        </button>
    }
  }

  return (
    <div className="reviews-tile">
      <div className="inside-spacing">
        <h1>{heading}</h1>
        <p>Description: {description}</p>
        <p>Rating: {rating}</p>
      </div>
      <Vote
        reviewId={id}
        voteCount={voteCount}
        user={props.user}
      />
      {deleteButtonElement}
    </div>
  )
}

export default ReviewTile