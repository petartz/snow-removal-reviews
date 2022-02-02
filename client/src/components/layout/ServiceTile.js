import React from "react"
import { Link } from "react-router-dom"

const ServiceTile = ({ service }) => {
  return (
    <div className="callout service-tile">
      <img
        className="service-image"
        src={service.photoUrl}
        alt="photo of snow removal service"
      />
      <Link to={`/services/${service.id}`}>
        {service.name}
      </Link>
    </div>
  )
}

export default ServiceTile