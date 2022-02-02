const Model = require("./Model.js")

class Service extends Model {
    static get tableName(){
        return "services"
    }

    static get relationMappings(){
        const Review = require("./Review.js")
        const User = require("./User.js")

        return{
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "services.id",
                    through: {
                        from: "reviews.serviceId",
                        to: "reviews.userId",
                        extra: ['heading', 'description', 'rating']
                    },
                    to: "users.id"
                }
            },

            reviews:{
                relation: Model.HasManyRelation,
                modelClass: Review,
                join:{
                    from: "services.id",
                    to: "reviews.serviceId"
                }
            }
        }
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