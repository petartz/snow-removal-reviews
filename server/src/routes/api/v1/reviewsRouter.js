import express from 'express'
import { Vote } from '../../../models/index.js'
import VoteSerializer from '../../../../serializers/VoteSerializer.js'
const reviewsRouter = new express.Router()

reviewsRouter.post('/:reviewId/votes', async (req, res) => {
  try {
    const { voteValue } = req.body
    const { reviewId } = req.params
    const priorVote = await VoteSerializer.getPriorVote(reviewId, req.user.id)

    if (!priorVote) {
      await Vote.query().insertAndFetch({
        value: voteValue,
        userId: req.user.id,
        reviewId: reviewId
      })
    } else {
      if(priorVote.value !== voteValue){
        await Vote.query().findById(priorVote.id).update({value: voteValue})
      } else {
        await Vote.query().deleteById(priorVote.id)
      }
    }
    const totalCount = await VoteSerializer.getTotal(reviewId)
    return res.status(201).json({ totalCount })

  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default reviewsRouter