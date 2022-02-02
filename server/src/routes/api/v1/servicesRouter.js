import express from "express";
import Service from "../../../models/Service.js";
import ServiceSerializer from "../../../../serializers/ServiceSerializer.js";
import cleanUserInput from "../../../../services/cleanUserInput.js";
import { ValidationError } from "objection";

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
  const formInput = cleanUserInput(req.body)
  console.log(formInput)
  try {
    const newService = await Service.query().insertAndFetch(formInput);
    return res.status(201).json({ service: newService });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error });
  }
});

export default serviceRouter;
