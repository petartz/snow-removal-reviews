import React, { useState } from "react";

const EditForm = props => {
  const [editedReview, setEditReview] = useState({
    id: props.id,
    heading: props.heading,
    description: props.description,
    rating: props.rating,
    userId: props.userId
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await props.submitEditReview(editedReview)
  }

  const handleInputChange = event => {
    setEditReview({
      ...editedReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return(
    <div className="callout form">
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
          <select
            id="rating"
            name="rating"
            onChange={handleInputChange}
            value={editedReview.rating}>
              <option value="">Please choose a score!</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
        </label>

        <input type="submit" className="submit-button"/>
      </form>
    </div>
  )

}
export default EditForm
