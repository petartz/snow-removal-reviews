import React, { useEffect, useState } from "react"
import ServiceTile from "./ServiceTile.js"
import AddServicesForm from "./AddServicesForm.js"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const ServicesIndex = (props) => {
  const [services, setServices] = useState([])
  const [errors, setErrors] = useState([])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/v1/services")
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setServices(body.services)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const postService = async (newServiceData) => {
    try {
      const response = await fetch("/api/v1/services", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newServiceData),
      });
      if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json()
            const newErrors = translateServerErrors(body.errors)
            setErrors(newErrors)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
      } else {
        const body = await response.json()
        setErrors([])
        setServices([...services, body.service])
        return true
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`)
    }
  }

  const servicesTiles = services.map((service) => {
    return <ServiceTile key={service.id} service={service} />
  })

  let serviceFormSection = <h1>Sign in to Add New Service</h1>
  if (props.user) {
    serviceFormSection = <AddServicesForm postService={postService} />
  }
  
  return (
    <div>
      <h1>Snow Removal Service Reviews!!</h1>
      {servicesTiles}
      <ErrorList errors={errors}/>
      {serviceFormSection}
    </div>
  )
}

export default ServicesIndex
