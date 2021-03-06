import express from "express";
import { Review } from "../../../models/index.js";
import cleanUserInput from "../../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import editReviewsRouter from "./editReviewsRouter.js"
import voteReviewsRouter from "./voteReviewsRouter.js"

const servicesReviewsRouter = new express.Router({ mergeParams:true })

servicesReviewsRouter.use("/:reviewId/editReview", editReviewsRouter)
servicesReviewsRouter.use("/:reviewId/votes", voteReviewsRouter)

servicesReviewsRouter.post("/", async (req,res) =>{
  const id = req.params.id
  const cleanInput = cleanUserInput(req.body)
  cleanInput.serviceId = id
  cleanInput.userId = req.user.id

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

servicesReviewsRouter.delete('/', async (req, res) => {
  try {
    const { reviewId } = req.body
    const reviewToDelete = await Review.query().findById(reviewId)
    await reviewToDelete.$relatedQuery('votes').delete()
    await Review.query().deleteById(reviewId)
    return res.status(201).json({ message: 'Successful Delete' })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default servicesReviewsRouter