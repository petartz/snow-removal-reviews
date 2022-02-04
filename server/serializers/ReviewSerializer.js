class ReviewSerializer{
  static getSummary(review){
<<<<<<< HEAD
    const allowedAttributes = ["id", "heading", "description", "rating"]
=======
    const allowedAttributes = ["heading", "description", "rating", "id"]
>>>>>>> efccf9b05e1f2527203d6706dec1990b041ad837
    let serializedReview = {}
    for(const attribute of allowedAttributes){
      serializedReview[attribute] = review[attribute]
    }
    return serializedReview
  }
}

export default ReviewSerializer