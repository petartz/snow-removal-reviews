import React from 'react'
import Vote from "./Vote.js"
import EditForm from "./EditForm.js"
import StarRating from './StarRating.js'

const ReviewTile = (props) => {
  const {heading, description, rating, id, voteCount } = props.review

  const handleDeleteClick = () => {
    props.deleteYourReview(id)
  }

  const handleEditClick = async () => {
    (props.currentReview === id) ? props.setCurrentReview(null) : props.setCurrentReview(id)
  }

  let showEditForm = null
  let deleteButtonElement = null
  if (props.user) {
    if (props.user.id === props.review.userId) {
      deleteButtonElement =
        <div className="crud-buttons">
          <i className="far fa-times-circle fa-lg delete-icon" onClick={handleDeleteClick}/>
          <button
            className="button"
            onClick={handleEditClick}>
              Edit Review
          </button>
          </div>

        if((props.currentReview === id)){
          showEditForm =
            <EditForm
              handleEditClick={handleEditClick}
              id = {id}
              heading = {heading}
              description = {description}
              rating = {rating}
              submitEditReview = {props.submitEditReview}
            />
          }
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
      {showEditForm}
    </div>
  )
}

export default ReviewTile