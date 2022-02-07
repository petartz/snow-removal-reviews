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
      ratingSum += review.rating
    });
    serializedService.rating = (ratingSum / relatedReviews.length)
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
    const serializedReviews = await Promise.all(relatedReviews.map( async (review) => {
      return await ReviewSerializer.getSummary(review);
    }));

    relatedReviews.forEach(review => {
      ratingSum += review.rating
    });

    serializedService.rating = (ratingSum / relatedReviews.length)
    serializedService.reviews = serializedReviews
    return serializedService
  }
}

export default ServiceSerializer