import React from 'react'
import Vote from "./Vote.js"

const ReviewTile = (props) => {
  const {heading, description, rating, id, voteCount } = props.review
  
  const deleteReview = () => {
    if (props.user) {
      if (props.user.id === props.review.userId) {
        return(
          <button onClick={handleDeleteClick}> 
            Delete Review
          </button>
        )
      }
    }
  }

  const handleDeleteClick = () => {
    props.deleteYourReview(id)
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
      {deleteReview()}
    </div>
  )
}

export default ReviewTile