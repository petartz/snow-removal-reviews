import React, {useEffect, useState} from "react"
import ServiceTile from "./ServiceTile.js"
import AddServicesForm from "./AddServicesForm.js"

const Index = (props) =>{
    const [services, setServices] = useState([])

    const fetchServices = async () => {
        try{
            const response = await fetch("/api/v1/services")
            if(!response.ok){
                throw (new Error(`${response.status} ${response.statusText}`))
            }
            const body = await response.json()
            setServices(body.services)

        }catch(error){
            return(console.error(`Error in fetch: ${error.message}`))
        }
    }

    useEffect(()=>{
        fetchServices()
    }, [])

    const postService = async (newServiceData) => {
        try {
            
            const response = await fetch("/api/v1/services", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newServiceData)
            })
            debugger
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw (error)
            } else {
                const body = await response.json()
                // const updatedServices = services.concat(body.service)
                setServices([ ...services, body.service])
            }

        } catch (error) {
            console.error(`Error in fetch ${error.message}`)
        }
    }

    const servicesTiles = services.map(service =>{
        return (
            <ServiceTile
                key={service.id}
                service={service}
            />
        )
    })

    return (
        <div>
            <h1>Snow Removal Service Reviews!!</h1>
            {servicesTiles}
            <AddServicesForm 
                postService = {postService}
            />
        </div>
    )
}

export default Index