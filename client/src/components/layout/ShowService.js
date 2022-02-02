import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile'

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


  const getServiceAndReviews = async () => {
    try{
      const response = await fetch(`/api/v1/services/${props.match.params.id}`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setService(body.service)
    }catch (error) {
      console.error(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getServiceAndReviews()
  }, [])

  const reviews = service.reviews.map((review) => {
    return <ReviewTile
            key={review.id}
            review={review}
            />
  })

  return(
    <div className= "grid-x grid-margin-x">
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
    </div>
  )
}

export default ShowService