/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get relationMappings() {
    const Service = require("./Service.js")
    const Review = require("./Review.js")
    const Vote = require("./Vote.js")

    return{
      services: {
        relation: Model.ManyToManyRelation,
        modelClass: Service,
        join: {
          from: "users.id",
          through: {
            from: "reviews.userId",
            to: "reviews.serviceId",
            extra:['heading','description','rating']
          },
          to: "services.id"
        }
      },
      reviews:{
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "user.id",
          to: "reviews.userId"
        }
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: 'users.id',
          to: 'votes.userId'
        }
      },
      reviews: {
        relation: Model.ManyToManyRelation,
        modelClass: Review,
        join: {
          from: 'users.id',
          through: {
            from: 'votes.userId',
            to: 'votes.reviewId'
          },
          to: 'reviews.id'
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
