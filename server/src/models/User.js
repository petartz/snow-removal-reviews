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

  static get relationMapping() {
    const Service = require("./Service.js")
    const Review = require("./Review.js")

    return{
      services: {
        relation: Model.ManyToManyRelation,
        modelClass: Service,
        join: {
          from: "users.id",
          through: {
            from: "reviews.userId",
            to: "reviews.serviceId"
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
