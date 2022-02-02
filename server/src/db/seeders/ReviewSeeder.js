import Service from "../../models/Service.js"
import User from "../../models/User.js"

class ReviewSeeder {
  static async seed() {
    const james = await User.query().findOne({ email: "james@james.com" })
    const nana = await User.query().findOne({ email: "paul@paul.com" })
    const nicksCo = await Service.query().findOne({ name: "Costagliola and sons and daughters" })
    const lillysCo = await Service.query().findOne({ name: "Fang Enterprises LLC, Incorporated" })

    const reviewOne = await james.$relatedQuery("services").relate({ id: lillysCo.id, heading: "Terrible Service", description: "Paul is still a genius though", rating: 10 })
    const reviewTwo = await nana.$relatedQuery("services").relate({ id: nicksCo.id, heading: "Always late", description: "Would have been great, if he was there", rating: 2 })
  }
}

export default ReviewSeeder