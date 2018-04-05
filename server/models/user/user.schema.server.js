var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  type: {type: String, enum: ['ADMIN', 'BUSINESS', 'REVIEWER', 'OBSERVER']} ,
  username: String,
  password: String,
  firstName:String,
  lastName: String,
  email: String,
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
  followings: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel'}],
  dateCreated: {type: Date, default : Date.now}
}, {collection:'user'});

module.exports = UserSchema;
