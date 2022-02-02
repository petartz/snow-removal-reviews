import User from "../../models/User.js"

class UserSeeder{
  static async seed(){
    const userData = [
      {email:"james@james.com", cryptedPassword:"123"},
      {email:"paul@paul.com", cryptedPassword:"456"}
    ]
    for (const singleUser of userData){
      const currentUser = await User.query().findOne(singleUser)
      if(!currentUser){
          await User.query().insert(singleUser)
      }
  }

  }
}
export default UserSeeder