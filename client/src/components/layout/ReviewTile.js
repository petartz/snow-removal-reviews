import React from 'react'
import Vote from "./Vote.js"
import StarRating from './StarRating.js'

const ReviewTile = (props) => {
  const {heading, description, rating, id, voteCount } = props.review
  
  const handleDeleteClick = () => {
    props.deleteYourReview(id)
  }

  let deleteButtonElement = null
  if (props.user) {
    if (props.user.id === props.review.userId) {
      deleteButtonElement = <i className="far fa-times-circle fa-lg delete-icon" onClick={handleDeleteClick}/> 
    }
  }

  return (
    <div className="reviews-tile">
      <div>
        <h1>{heading}</h1>
        <p>{description}</p>
        <StarRating rating={rating} ratingLabel='Rating'/>
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