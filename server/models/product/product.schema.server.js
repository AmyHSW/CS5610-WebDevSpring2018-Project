var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  _user: {type : mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  productName: String,
  description: String,
  brand: String,
  price: Number,
  url : String,
  width : String,
  reviews : [{type : mongoose.Schema.Types.ObjectId, ref: 'ReviewModel'}],
  dateCreated: {type: Date, default: Date.now},
  lastViewed: {type: Date}
}, {collection: 'product'});

module.exports = ProductSchema;
