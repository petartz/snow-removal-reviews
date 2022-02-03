import express from "express";
import { Review } from "../../../models/index.js";
import cleanUserInput from "../../../../services/cleanUserInput.js";
import { ValidationError } from "objection";

const reviewsRouter = new express.Router()

reviewsRouter.post("/", (req,res) =>{
  const cleanInput = cleanUserInput(req.body)
  try {
    const newReview = await Review.query().insertAndFetch(cleanInput)
    return res.status(201).json({ review: newReview })
  } catch(error) {
    if(error instanceof ValidationError){
      return res.status(422).json({ errors: error.data })
    } else{
      return res.status(500).json({ errors: error })
    }
  }
})

export default reviewsRouter