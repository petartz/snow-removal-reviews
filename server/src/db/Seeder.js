/* eslint-disable no-console */
import { connection } from "../boot.js"
import ServiceSeeder from "./seeders/ServiceSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding services...")
    await ServiceSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder