import ReviewSerializer from "./ReviewSerializer.js"

class ServiceSerializer{
  static async getSummary(service){
    const allowedAttributes = ["id", "name", "photoUrl"]
    let ratingSum = 0;

    let serializedService = {}
    for(const attribute of allowedAttributes){
      serializedService[attribute] = service[attribute]
    }

    const relatedReviews = await service.$relatedQuery('reviews')

    relatedReviews.forEach(review => {
      console.log(review)
      console.log(review.rating)
      ratingSum += review.rating
    });

    console.log(`rating sum = ${ratingSum}`)

    serializedService.rating = (ratingSum / relatedReviews.length)

    console.log(`related reviews = ${relatedReviews}`)
    return serializedService
  }

  static async getDetails(service){
    const allowedAttributes = ["id", "name", "number", "email", "websiteUrl", "photoUrl"]
    let ratingSum = 0;

    let serializedService = {}
    for(const attribute of allowedAttributes){
      serializedService[attribute] = service[attribute]
    }

    const relatedReviews = await service.$relatedQuery('reviews')
    const serializedReviews = relatedReviews.map((review) => {
      return ReviewSerializer.getSummary(review);
    });

    relatedReviews.forEach(review => {
      ratingSum += review.rating
    });

    serializedService.rating = (ratingSum / relatedReviews.length)
    serializedService.reviews = serializedReviews
    return serializedService
  }
}

export default ServiceSerializer