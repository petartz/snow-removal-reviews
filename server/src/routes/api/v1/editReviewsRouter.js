import express from "express"
import Review from "../../../models/Review.js"
import { ValidationError } from "objection";
import cleanEditReviewInput from "../../../../services/cleanEditReviewInput.js"

const editReviewsRouter = new express.Router( {mergeParams:true} )

editReviewsRouter.post("/", async (req, res) => {
  const cleanInput = cleanEditReviewInput(req.body)
  const { id, heading, description, rating } = cleanInput
  try{
    const editedReview = await Review.query().update({ heading, description, rating }).findById(id)
    return res.status(201).json( {editedReview} )
  } catch(error) {
    if (error instanceof ValidationError){
      return res.status(422).json( {errors: error.data} )
    }
    return res.status(500).json( {errors:error} )
  }
})

export default editReviewsRouter