import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router" // <- here
import ReviewTile from './ReviewTile'
import ErrorList from "./ErrorList.js"
import AddReviewsForm from './AddReviewsForm'
import translateServerErrors from '../../services/translateServerErrors'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'

const ShowService = (props) => {
  const [service, setService] = useState({
    name: '',
    number: '',
    email: '',
    websiteUrl: '',
    photoUrl: '',
    rating: '',
    reviews: []
  })
  const [errors, setErrors] = useState([])
  const [currentReview, setCurrentReview] = useState(null)

  const getServiceAndReviews = async () => {
    try {
      const response = await fetch(`/api/v1/services/${props.match.params.id}`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setService(body.service)
    } catch (error) {
      console.error(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getServiceAndReviews()
  }, [])


  const submitEditReview = async (editedReview) => {
    try {
      const response = await fetch(`/api/v1/services/${props.match.params.id}/editReview`, {
        method: "POST",
        headers: new Headers({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(editedReview)
      })

      if (!response.ok){
        if(response.status === 422){
          const body = await response.json()
          alert(body.message)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const replacedReview = service.reviews.find(review => review.id === editedReview.id)
      const replacedIndex = service.reviews.indexOf(replacedReview)

      const allReviews = service.reviews.filter(review => review.id != editedReview.id)
      allReviews.splice(replacedIndex, 0, editedReview)

      setService({ ...service, reviews: allReviews })

      return true
    } catch(error) {
      console.log('you messed up')
    }

  }

  const deleteYourReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/services/${props.match.params.id}/reviews`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ reviewId })
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
      const updatedReviews = service.reviews.filter(review => review.id != reviewId)
      setService({...service, reviews: updatedReviews})
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const reviewsMap = service.reviews.map((review) => {
    return(
      <ReviewTile
        key = {review.id}
        review={review}
        user={props.user}
        getServiceAndReviews={getServiceAndReviews}
        deleteYourReview={deleteYourReview}

        currentReview = {currentReview}
        setCurrentReview = {setCurrentReview}
        submitEditReview = {submitEditReview}
      />
    )
  })

  const postReview = async (newReview) =>{
    try {
      const response = await fetch(`/api/v1/services/${props.match.params.id}/reviews`, {
        method:"POST",
        headers: new Headers ({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(newReview),
      });
      if(!response.ok){
        if(response.status === 422){
          const responseBody = await response.json()
          const newErrors = translateServerErrors(responseBody.errors)
          setErrors(newErrors)
        } else{
          throw (new Error(`${response.status} ${response.statusText}`))
        }
      }
      const responseBody = await response.json()
      setErrors([])
      setService({...service, reviews: [...service.reviews, responseBody.review]})
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  let reviewFormMessage = <div className="centered"><Link to="/user-sessions/new" className="sign-in-link">Sign in to Add New Review</Link></div>
  if (props.user) {
    reviewFormMessage =
      <AddReviewsForm
        postReview={postReview}
      />
  }

  return(
    <div className="service-show">
      <div className="service-header">
        <div className="image-stars">
          <img className="show-page-image"
              src={service.photoUrl}
              alt="photo of snow removal service"
              />
            <StarRating rating={service.rating} ratingLabel='Average Rating'/>
        </div>
        <div className="service-info">
          <h1 className="service-name">{service.name}</h1>
          <p>Phone number: {service.number}</p>
          <p>{service.email}</p>
          <a href={service.websiteUrl} target="_blank">Website</a>
        </div>
      </div>
      <div className="grid-x grid-margin-x bottom-half">
        <div className="cell small-6">
          {reviewsMap}
        </div>
        <div className="cell small-6">
          <ErrorList errors={errors}/>
          {reviewFormMessage}
        </div>
      </div>
    </div>
  )
}

export default withRouter(ShowService)