import Service from "../../models/Service.js"
import User from "../../models/User.js"

class ReviewSeeder {
  static async seed(){
    const james = await User.query().findById(1)
    const nana = await User.query().findById(2)
    const nicksCo = await Service.query().findById(1)
    const lillysCo = await Service.query().findById(2)


    const reviewOne = await james.$relatedQuery("services").relate({id:lillysCo.id, heading:"Terrible Service", description:"Paul is still a genius though", rating:10})
    const reviewTwo = await nana.$relatedQuery("services").relate({id:nicksCo.id, heading:"Always late", description:"Would have been great, if he was there", rating:2})
  }

}

export default ReviewSeeder