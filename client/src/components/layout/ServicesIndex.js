import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ServiceTile from "./ServiceTile.js"
import AddServicesForm from "./AddServicesForm.js"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import kelvinConverter from "../../services/KelvinConverter.js"

const ServicesIndex = (props) => {
  const [services, setServices] = useState([])
  const [errors, setErrors] = useState([])
  const [searchText, setSearchText] = useState('')
  


  // const successfulLookup = async position => {
  //   const { latitude, longitude } = position.coords
  //   console.log(latitude, longitude)
  //   try{
  //     const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=d8e8742fa1b1aa5b85716c6144013e98`)
  //     const body = await response.json()
  //     let temp = kelvinConverter(body.list[0].main.temp)
  //     setForecast({
  //       city: body.city.name,
  //       temp: temp,
  //       description: body.list[0].weather[0].description            
  //     })
  //     if(!response.ok){
  //       throw new Error(`${response.status} ${response.statusText}`)
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  
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

  const onInputChange = (event) => {
    event.preventDefault()
    setSearchText(event.currentTarget.value)
  }

  let searchedItems = services.filter((service) => {
    return service.name.toLowerCase().includes(searchText)
  })

  const servicesTiles = searchedItems.map((service) => {
    return <ServiceTile key={service.id} service={service} />
  })

  let serviceFormSection = <div className="centered"><Link to="/user-sessions/new" className="sign-in-link">Sign in to Add a New Service</Link></div>
  if (props.user) {
    serviceFormSection = <AddServicesForm postService={postService} />
  }
  
  return (
    <div>
      <div className="index-header">
        <h1>Snow Removal Services</h1>
      </div>
      <form className="search-weather">
        <div className="search-bar">
          <label htmlFor="search">Find a Service
            <input 
              type="text" 
              name="search" 
              placeholder="Search.."
              value={searchText}
              onChange={onInputChange}
              className="search-input"
            >
            </input>
          </label>
        </div>
        <div className="weather">
          <p className="weather-item"><strong>City: </strong>{props.forecast.city}</p>
          <p className="weather-item"><strong>Temp: </strong>{props.forecast.temp}°F</p>
          <p className="weather-item"><strong>Conditions: </strong>{props.forecast.description}</p>
        </div>
      </form>

      <div className="grid-x grid-margin-x bottom-half">
        <div className="cell small-6">
          {servicesTiles}
        </div>
        <div className="cell small-6 ">
          <ErrorList errors={errors}/>
          {serviceFormSection}
        </div>
      </div>
    </div>
  )
}

export default ServicesIndex
