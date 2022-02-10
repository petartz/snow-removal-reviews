import Service from "../../models/Service.js"
import User from "../../models/User.js"

class ReviewSeeder {
  static async seed() {
    const james = await User.query().findOne({ email: "james@james.com" })
    const nana = await User.query().findOne({ email: "paul@paul.com" })
    const  apex = await Service.query().findOne({ name: "Apex Snow Removal Services" })
    const mcneil = await Service.query().findOne({ name: "W. McNeil & Sons & Daughters" })
    const plowgals = await Service.query().findOne({ name: "PlowGals of Metro West" })

    const reviewOne = await james.$relatedQuery("services").relate({ id: apex.id, heading: "Terrible Service", description: "Slipped on black ice going out to the car.  Apex did a half job and didn't salt my driveway.  Honestly, I'm super disappointed in the service given their rates.  Nice guys though.", rating: 1 })

    const reviewTwo = await nana.$relatedQuery("services").relate({ id: mcneil.id, heading: "Always late", description: "McNeil's team usually does a decent job, but for some reason, they are always inexcusably late.  I really need to get to work on time, and I'd be better off waiting for the sun to melt the snow.  They used to provide better service back in the day, and it really makes me wonder if McNeil is past his prime.", rating: 2 })

    const reviewThree = await nana.$relatedQuery("services").relate({ id: plowgals.id, heading: "Superb performance", description: "I called PlowGals the night before it was forecast that the Boston area would receive record amounts of snow, and they happily added me to the list for the next morning.  When I woke up at 6 am the next day, my driveway was pristine.  I can't say enough good things about PlowGals.  Unparalleled grit.", rating: 5 })
  }
}

export default ReviewSeeder