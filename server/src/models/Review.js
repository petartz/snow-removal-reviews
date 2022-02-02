const Model = require('./Model.js')

class Review extends Model{
    static get tableName(){
        return 'reviews'
    }
    
    static get relationMappings(){
        const Service = require('./Service.js')
        const User = require('./User.js')

        return {
            service: {
                relation: Model.BelongsToOneRelation,
                modelClass: Service,
                join: {
                    from: 'reviews.serviceId',
                    to: 'services.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'reviews.userId',
                    to: 'users.id'
                }
            }
        }
    }

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['rating', 'heading'],
            properties: {
                heading: {type: 'string', minLength: 1},
                description: {type: 'string', maxLength: 250},
                rating: {type: ['string', 'integer']}
            }
        }
    }
}

module.exports = Review