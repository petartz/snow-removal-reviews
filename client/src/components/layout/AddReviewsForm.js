import React, { useEffect, useState } from "react"
import ReviewTile from "./ReviewTile"

const AddReviewsForm = (props) => {
  const [newReview, setNewReview] = useState({
    heading: "",
    description: "",
    rating: "",
  })

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setNewReview({
      heading: "",
      description: "",
      rating: ""
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await props.postReview(newReview)
    if(success){
      clearForm()
    }
  }

  return(
    <div className="callout form">
      <h1>Add New Review</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="heading">
          Heading:
          <input
            type="text"
            id="heading"
            name="heading"
            onChange={handleInputChange}
            value={newReview.heading}/>
        </label>

        <label htmlFor="description">
          Description:
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={newReview.description}/>
        </label>

        <label htmlFor="rating">
          Rating:
          <select
            id="rating"
            name="rating"
            onChange={handleInputChange}
            value={newReview.rating}>
              <option value="">Please choose a score!</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
        </label>

        <input className="submit-button" type="submit"/>
      </form>
    </div>
  )
}

export default AddReviewsForm