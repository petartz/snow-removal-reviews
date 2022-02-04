import Review from "../src/models/Review.js"

class VoteSerializer {
  static async getTotal(reviewId) {
    const review = await Review.query().findById(reviewId)
    const relatedVotes = await review.$relatedQuery("votes")

    let totalCount = {
      upVote: 0,
      downVote: 0
    }

    relatedVotes.forEach(relatedVote => {
      if (relatedVote.value === 1) {
        totalCount.upVote++
      } else if (relatedVote.value === -1) {
        totalCount.downVote++
      }
    })

    return totalCount
  }

  static async checkForPriorVote(reviewId, userId) {
    const review = await Review.query().findById(reviewId)
    const priorVote = await review.$relatedQuery("votes").findOne({ userId: userId })
    if (!priorVote) {
      return false
    }
    return true
  }
}

export default VoteSerializer