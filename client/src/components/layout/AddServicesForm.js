import React, { useState } from "react"

const AddServicesForm = props => {
  const [newService, setNewService] = useState({
    name: "",
    number: "",
    email: "",
    websiteUrl: "",
    photoUrl: ""
  })

  const handleInputChange = event => {  
    setNewService({...newService, [event.currentTarget.name]: event.currentTarget.value})
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.postService(newService)
  }

  return (
    <div className="callout secondary">
      <h1> Add A New Service </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:
          <input type="text" id="name" name="name" onChange={handleInputChange}></input>
        </label>
        <label htmlFor ="number">Phone Number:
          <input type="text" id="number" name="number" onChange={handleInputChange}></input>
        </label>
        <label htmlFor ="email">Email:
          <input type="text" id="email" name="email" onChange={handleInputChange}></input>
        </label>
        <label htmlFor ="websiteUrl">Website URL:
          <input type="text" id="websiteUrl" name="websiteUrl" onChange={handleInputChange}></input>
        </label>
        <label htmlFor ="photoUrl">Photo URL:
          <input type="text" id="photoUrl" name="photoUrl" onChange={handleInputChange}></input>
        </label>
        <input type="submit"></input>

      </form>
    </div>
  )

}

export default AddServicesForm