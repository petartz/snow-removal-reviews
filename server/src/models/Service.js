const Model = require("./Model.js")

class Service extends Model {
    static get tableName(){
        return "services"
    }

    static get jsonSchema(){
        return{
            type: "object",
            required: ["name"],
            properties:{
                name:{type:"string", minLength:1, maxLength:50},
                number:{type:"string"},
                email:{type:"string"},
                websiteUrl: {type:"string"},
                photoUrl: {type:"string"}
            }
        }
    }

}

module.exports = Service