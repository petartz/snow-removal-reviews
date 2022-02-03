import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile'
import ErrorList from "./ErrorList.js"

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
  const [reviews, setReviews] = useState([])
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

  const reviews = service.reviews.map((review) => {
    return(
      <ReviewTile
        key={review.id}
        review={review}
      />
    )
  })

  const postReview = async (newReview) =>{
    try {
      const response = await fetch("/api/v1/reviews", {
        method:"POST",
        headers:  new Headers ({
          "Content-type" : "application/json"
        }),
        body: JSON.stringify(newReview),
      });
      if(!response.ok){
        if(response.status === 422){
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        } else{
          throw (new Error(`${response.status} ${response.statusText}`))
        }
      }
      const body = await response.json()
      setErrors([])
      setReviews([...reviews, body.review])
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  let reviewFormMessage = <h1>Sign in to Add New Service</h1>
  if (props.user) {
    reviewFormMessage = <AddReviewsForm postReview={postReview} />
  }

  return(
    <div className= "grid-x grid-margin-x">
      <ErrorList errors={errors}/>
      <div className="cell small-6 service">
        <h1>{service.name}</h1>
        <img className="show-page-image"
          src={service.photoUrl}
          alt="photo of snow removal service"
        />
        <p>stars: {service.rating}</p>
      </div>
      <div className="cell small-6 reviews">
        {reviews}
      </div>
      <div>
        {reviewFormMessage}
      </div>
    </div>
  )
}

export default ShowService