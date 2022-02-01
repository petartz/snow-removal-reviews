import React from "react"

const ServiceTile = ({ service }) => {
  return (
    <div className="callout service-tile">
      <img
        className="service-image"
        src={service.photoUrl}
        alt="photo of snow removal service"
      />
      <a href={service.websiteUrl}>
        {service.name}
      </a>
    </div>
  )
}

export default ServiceTile