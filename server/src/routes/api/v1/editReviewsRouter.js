import express from "express"
import Review from "../../../models/Review.js"
const editReviewsRouter = new express.Router( {mergeParams:true} )

editReviewsRouter.post("/", async (req, res) => {
  const { id, heading, description, rating } = req.body
  const reviewId = req.params.id
  try{
    const editedReview = await Review.query().patch({ heading, description, rating }).findById(id)
    return res.status(201).json( {editedReview} )
  } catch(error) {
    console.error(error.message)
  }
})

export default editReviewsRouter