import VoteSerializer from "./VoteSerializer.js"

class ReviewSerializer{
  static async getSummary(review){
    const allowedAttributes = ["heading", "description", "rating", "id", "userId"]
    let serializedReview = {}
    for(const attribute of allowedAttributes){
      serializedReview[attribute] = review[attribute]
    }
    const voteCount = await VoteSerializer.getTotal(review.id)
    serializedReview.voteCount = voteCount

    return serializedReview
  }
}

export default ReviewSerializer