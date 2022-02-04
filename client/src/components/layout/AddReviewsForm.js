import React, { useEffect, useState } from "react"

const AddReviewsForm = (props) => {
  const [newReview, setNewReview] = useState({
    heading: "",
    description: "",
    rating: "",
  })

  const handleInputChange = event =>{
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () =>{
    setNewReview({
      heading: "",
      description: "",
      rating: ""
    })
  }

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const success = await props.postReview(newReview)
    if(success){
      clearForm()
    }
  }

  return(
    <div className="callout reviews-form">
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
          <input
            type="integer"
            id="rating"
            name="rating"
            onChange={handleInputChange}
            value={newReview.rating}/>
        </label>

        <input type="submit"/>
      </form>
    </div>
  )
}

export default AddReviewsForm