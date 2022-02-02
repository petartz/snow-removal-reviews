import express from "express";
import Service from "../../../models/Service.js";
import ServiceSerializer from "../../../../serializers/ServiceSerializer.js";

const serviceRouter = new express.Router();

serviceRouter.get("/", async (req, res) => {
  try {
    const services = await Service.query();
    const serializedServices = services.map((service) => {
      return ServiceSerializer.getSummary(service);
    });
    return res.status(200).json({ services: serializedServices });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

serviceRouter.post("/", async (req, res) => {
  try {

    const newService = await Service.query().insertAndFetch(req.body);
    return res.status(201).json({ service: newService });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default serviceRouter;
