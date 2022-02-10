import Service from "../../models/Service.js"
class ServiceSeeder {
    static async seed(){
      const serviceData = [
        {
          name:"Apex Snow Removal Services",
          email: "apexsnowremoval@gmail.com",
          number:"617-100-2000",
          websiteUrl:"https://www.apexsnowremoval.com",
          photoUrl:"https://upload.wikimedia.org/wikipedia/commons/e/e7/Child_using_a_snow_shovel_to_remove_snow_03.jpg",
          description: "Serving the Greater Boston area's snow removal needs since 1985."
        },
        {
          name:"W. McNeil & Sons & Daughters",
          number:"617-200-1000",
          websiteUrl:"https://www.wmcneilsnowremoval.com",
          photoUrl:"https://upload.wikimedia.org/wikipedia/commons/2/2f/City_Snowblower.JPG",
          description: "Are you tired of fighting old man winter?  Dreading the early morning wake up to clear your driveway? Fed up with clearing your walkway when you get home from work? W. McNeil & Sons & Daughters has all of your winter needs covered!"
        },
        {
          name:"PlowGals of Metro West",
          number:"617-300-3000",
          websiteUrl:"https://www.snowremovalmetrowest.com",
          photoUrl:"https://media.istockphoto.com/photos/man-clearing-or-removing-snow-with-a-snowblower-picture-id1222260612?k=20&m=1222260612&s=612x612&w=0&h=rp74zuab9zJGMeqvzlVQ7etJxzU_Nztg611Oo_xjXvo=",
          description: "A snowplower's central duty is to operate a snowplow or tractor with a plow to clear snow from the roadways. But a PlowGal does it with panache."
        }
      ]

      for (const singleService of serviceData){
          const currentService = await Service.query().findOne(singleService)
          if(!currentService){
              await Service.query().insert(singleService)
          }
      }

    }
}

export default ServiceSeeder