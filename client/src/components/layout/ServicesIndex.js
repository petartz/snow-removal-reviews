import React, { useEffect, useState } from "react";
import ServiceTile from "./ServiceTile.js";

const ServicesIndex = (props) => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/v1/services");
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      setServices(body.services);
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const servicesTiles = services.map((service) => {
    return <ServiceTile key={service.id} service={service} />;
  });

  return (
    <div>
      <h1>Snow Removal Service Reviews!!</h1>
      {servicesTiles}
    </div>
  );
};

export default ServicesIndex;
