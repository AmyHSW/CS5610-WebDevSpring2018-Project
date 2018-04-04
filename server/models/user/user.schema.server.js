var mongoose = require("mongoose");
var userSchema = require('../user/user.schema.server');
var productSchema = require('../product/product.schema.server');

var UserSchema = mongoose.Schema({
  type: {type: String, enum: ['ADMIN', 'BUSINESS', 'REVIEWER', 'OBSERVER']} ,
  username: String,
  password: String,
  firstName:String,
  lastName: String,
  email: String,
  followers: [userSchema],
  followings: [userSchema],
  favorites: [productSchema],
  dateCreated: {type: Date, default : Date.now}
}, {collection:'user'});

module.exports = UserSchema;
