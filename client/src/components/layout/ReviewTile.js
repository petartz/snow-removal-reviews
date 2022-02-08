import React from 'react'
import Vote from "./Vote.js"
import EditForm from "./EditForm.js"

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
          <button
            className="button"
            onClick={handleDeleteClick}>
              Delete Review
          </button>
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
              heading = {heading}
              description = {description}
              rating = {rating}
            />
          }
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
      {showEditForm}
    </div>
  )
}

export default ReviewTile