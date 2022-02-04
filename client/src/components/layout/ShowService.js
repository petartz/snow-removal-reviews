import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router" // <- here
import ReviewTile from './ReviewTile'
import ErrorList from "./ErrorList.js"
import AddReviewsForm from './AddReviewsForm'
import translateServerErrors from '../../services/translateServerErrors'
import { Link } from 'react-router-dom'

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

  const reviewsMap = service.reviews.map((review) => {
    return(
      <ReviewTile
        key = {review.id}
        review={review}
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

  let reviewFormMessage = <Link to="/user-sessions/new">Sign in to Add New Review</Link>
  if (props.user) {
    reviewFormMessage = <AddReviewsForm postReview={postReview}/>
  }

  return(
    <div className= "grid-x grid-margin-x show-services-page">
      <div className="cell small-6 service">
        <h1>{service.name}</h1>

        <div className="show-page-image">
          <img className="show-page-image"
            src={service.photoUrl}
            alt="photo of snow removal service"
          />
          <p>Stars: {service.rating}</p>
        </div>

        <div className="reviews-form">
          <ErrorList errors={errors}/>
          <div className='reviews-form-message'> 
            {reviewFormMessage}
          </div>
        </div>
      </div>

      <div className="cell small-6 reviews">
        {reviewsMap}
      </div>

    </div>
  )
}

export default withRouter(ShowService)