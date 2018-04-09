var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  _user: {type : mongoose.Schema.ObjectId, ref: 'UserModel'},
  productName: String,
  description: String,
  brand: String,
  price: Number,
  url : String,
  width : String,
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'product'});

module.exports = ProductSchema;
