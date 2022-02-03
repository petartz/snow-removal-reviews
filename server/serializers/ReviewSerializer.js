class ReviewSerializer{
  static getSummary(review){
    const allowedAttributes = ["id", "heading", "description", "rating"]
    let serializedReview = {}
    for(const attribute of allowedAttributes){
      serializedReview[attribute] = review[attribute]
    }
    return serializedReview
  }
}

export default ReviewSerializer