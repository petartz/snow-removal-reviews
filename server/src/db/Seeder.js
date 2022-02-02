/* eslint-disable no-console */
import { connection } from "../boot.js"
import ServiceSeeder from "./seeders/ServiceSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding services...")
    await ServiceSeeder.seed()
    console.log("Seeding users...")
    await UserSeeder.seed()
    console.log("Seeding reviews...")
    await ReviewSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder