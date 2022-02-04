import express from 'express'
import { Vote } from '../../../models/index.js'
import VoteSerializer from '../../../../serializers/VoteSerializer.js'
import { Review } from '../../../models/index.js'

const votesRouter = new express.Router()

votesRouter.get('/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params
    const totalCount = await VoteSerializer.getTotal(reviewId)
    return res.status(201).json({ totalCount })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

votesRouter.post('/:reviewId', async (req, res) => {
  try {
    const { voteValue } = req.body
    const { reviewId } = req.params
    const priorVote = await VoteSerializer.checkForPriorVote(reviewId, req.user.id)
    if (!priorVote) {
      await Vote.query().insertAndFetch({
        value: voteValue,
        userId: req.user.id,
        reviewId: reviewId
      })
      const totalCount = await VoteSerializer.getTotal(reviewId)
      return res.status(201).json({ totalCount })
    } else {
      return res.status(422).json({ message: "You already voted" })
    }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

votesRouter.delete('/', async (req, res) => {
  try {
    const { reviewId } = req.body
    const userId = req.user.id
    const review = await Review.query().findById(reviewId)
    const priorVote = await review.$relatedQuery("votes").findOne({ userId: userId })
    if (priorVote) {
      await Vote.query().deleteById(priorVote.id)
      const totalCount = await VoteSerializer.getTotal(reviewId)
      return res.status(201).json({ totalCount })
    } else {
      return res.status(422).json({ message: "You haven't voted yet" })
    }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default votesRouter