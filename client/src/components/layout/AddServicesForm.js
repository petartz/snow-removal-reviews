import React, { useState } from "react"

const AddServicesForm = (props) => {
  const [newService, setNewService] = useState({
    name: "",
    number: "",
    email: "",
    websiteUrl: "",
    photoUrl: "",
  })

  const handleInputChange = (event) => {
    setNewService({ ...newService, [event.currentTarget.name]: event.currentTarget.value });
  }

  const clearForm = () => {
    setNewService({
      name: "",
      number: "",
      email: "",
      websiteUrl: "",
      photoUrl: ""
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await props.postService(newService)
    if (success) {
      clearForm()
    }
  }

  return (
    <div className="callout services-form">
      <h1 className="add-service-heading">Add A New Service</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input 
            type="text" 
            id="name" 
            name="name" 
            onChange={handleInputChange}
            value={newService.name}
          />
        </label>
        <label htmlFor="number">
          Phone Number:
          <input 
            type="text" 
            id="number" 
            name="number" 
            onChange={handleInputChange}
            value={newService.number}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input 
            type="text" 
            id="email" 
            name="email" 
            onChange={handleInputChange}
            value={newService.email}
          />
        </label>
        <label htmlFor="websiteUrl">
          Website URL:
          <input 
            type="text" 
            id="websiteUrl" 
            name="websiteUrl" 
            onChange={handleInputChange}
            value={newService.websiteUrl}
          />
        </label>
        <label htmlFor="photoUrl">
          Photo URL:
          <input 
            type="text" 
            id="photoUrl" 
            name="photoUrl" 
            onChange={handleInputChange}
            value={newService.photoUrl}
          />
        </label>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default AddServicesForm
