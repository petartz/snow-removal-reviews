import Service from "../../models/Service.js"
class ServiceSeeder {
    static async seed(){
      const serviceData = [
        {
          name:"Costagliola and sons and daughters",
          email: "redheadedmut@gmail.com",
          number:"6171002000",
          websiteUrl:"https://www.redheadedmut.com",
          photoUrl:"https://upload.wikimedia.org/wikipedia/commons/e/e7/Child_using_a_snow_shovel_to_remove_snow_03.jpg"
        },
        {
          name:"Fang Enterprises LLC, Incorporated",
          number:"6172001000",
          websiteUrl:"https://www.fang.com",
          photoUrl:"https://upload.wikimedia.org/wikipedia/commons/2/2f/City_Snowblower.JPG"
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