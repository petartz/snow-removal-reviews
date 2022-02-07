// include all of your models here using CommonJS requires
const User = require("./User.js")
const Service = require ("./Service.js")
const Review = require('./Review.js')
const Vote = require('./Vote.js')

module.exports = {User, Service, Review, Vote};
