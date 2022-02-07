import React from 'react'
import Vote from "./Vote.js"

const ReviewTile = (props) => {
  const {heading, description, rating, id } = props.review
  
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
    deleteYourReview()
  }

  const deleteYourReview = async () => {
    try {
      const response = await fetch('/api/v1/services/:id/reviews', {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ id })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          alert(body.message)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      props.getServiceAndReviews()
    } catch (error) {
      return console.error(`Error in fetch: ${error.mesage}`)
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
        reviewId={props.review.id}
        user={props.user}
      />
      {deleteReview()}
    </div>
  )
}

export default ReviewTile