var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  _user: {type : mongoose.Schema.ObjectId, ref: 'UserModel'},
  productName: String,
  description: String,
  brand: String,
  price: Number,
  url : String,
  width : String,
  reviews : [{type : mongoose.Schema.ObjectId, ref: 'ReviewModel'}],
  dateCreated: {type: Date, default: Date.now},
  lastViewed: {type: Date}
}, {collection: 'product'});

module.exports = ProductSchema;
