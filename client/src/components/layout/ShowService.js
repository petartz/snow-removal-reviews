import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile'
import ErrorList from "./ErrorList.js"
import AddReviewsForm from './AddReviewsForm'
import getCurrentUser from '../../services/getCurrentUser'
import translateServerErrors from '../../services/translateServerErrors'

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
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

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
    fetchCurrentUser()
    getServiceAndReviews()
  }, [])

  const reviewsMap = service.reviews.map((review) => {
    return(
      <ReviewTile
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
          debugger
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

  let reviewFormMessage = <h1>Sign in to Add New Review</h1>
  if (currentUser) {
    reviewFormMessage = <AddReviewsForm postReview={postReview} userId={currentUser.id} serviceId = {props.match.params.id} />
  }

  return(
    <div className= "grid-x grid-margin-x show-services-page">
      <div className="cell small-6 service">
        <h1>{service.name}</h1>
        <div className="show-page-image">
          <img 
            src={service.photoUrl}
            alt="photo of snow removal service"
          />
          <p>Stars: {service.rating}</p>
        </div>
        <div className="reviews-form">
          <ErrorList errors={errors}/>
          {reviewFormMessage}
        </div>
      </div>
      <div className="cell small-6 reviews">
        {reviewsMap}
      </div>
    </div>
  )
}

export default ShowService