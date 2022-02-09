import React, { useState } from "react";



const EditForm = props => {

  const [editedReview, setEditReview] = useState({
    id: props.id,
    heading: props.heading,
    description: props.description,
    rating: props.rating,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await props.submitEditReview(editedReview)
    if(success){
      clearForm()
    }
  }

  const handleInputChange = event => {
    setEditReview({
      ...editedReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setEditReview({
      heading: "",
      description: "",
      rating: ""
    })
  }


  return(
    <div className="callout reviews-form">
      <h1>Edit your Review</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="heading">
          Heading:
          <input
            type="text"
            id="heading"
            name="heading"
            onChange={handleInputChange}
            value={editedReview.heading}/>
        </label>

        <label htmlFor="description">
          Description:
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={editedReview.description} />
        </label>

        <label htmlFor="rating">
          Rating:
          <input
            type="integer"
            id="rating"
            name="rating"
            onChange={handleInputChange}
            value={editedReview.rating} />
        </label>

        <input type="submit"/>
      </form>
    </div>
  )

}
export default EditForm
