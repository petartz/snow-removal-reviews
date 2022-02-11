import React from 'react'
import Vote from "./Vote.js"
import EditForm from "./EditForm.js"
import StarRating from './StarRating.js'
import ErrorList from "./ErrorList.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const ReviewTile = (props) => {
  const {heading, description, rating, id, voteCount } = props.review

  const handleDeleteClick = () => {
    props.deleteYourReview(id)
  }

  const handleEditClick = async () => {
    (props.currentReview === id) ? props.setCurrentReview(null) : props.setCurrentReview(id)
  }

  let showEditForm = null
  let deleteAndEditButton = null
  if (props.user) {
    if (props.user.id === props.review.userId) {
      deleteAndEditButton =
        <div className="crud-buttons">
          <FontAwesomeIcon icon={faTimesCircle} className="delete-icon fa-lg" onClick ={handleDeleteClick}/>
          <button
            className="submit-button edit-button"
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
              userId = {props.user.id}
            />
        }
    }
  }

  let errorList = null
  if(props.currentReview === id){
    errorList =  <ErrorList errors={props.errors}/>
  }



  return (
    <div className="reviews-tile">
      {errorList}
      <div>
        <h1>{heading}</h1>
        <p>{description}</p>
        <StarRating rating={rating} ratingLabel='Rating'/>
      </div>
      <Vote
        reviewId={id}
        serviceId={props.serviceId}
        voteCount={voteCount}
        user={props.user}
      />
      {deleteAndEditButton}
      {showEditForm}
    </div>
  )
}

export default ReviewTile