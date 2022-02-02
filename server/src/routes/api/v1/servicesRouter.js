import express from "express";
import Service from "../../../models/Service.js";
import ServiceSerializer from "../../../../serializers/ServiceSerializer.js";

const serviceRouter = new express.Router();

serviceRouter.get("/", async (req, res) => {
  try {
    const services = await Service.query();
    const serializedServices = await Promise.all(services.map((service) => {
      return ServiceSerializer.getSummary(service);
    }));
    return res.status(200).json({ services: serializedServices });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

serviceRouter.get("/:id", async (req, res) =>{
  const id = req.params.id
  try {
    const service = await Service.query().findById(id)
    let serializedService = await ServiceSerializer.getDetails(service)
    return res.status(200).json({ service: serializedService })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})
export default serviceRouter;
