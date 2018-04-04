var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  _user:{type : mongoose.Schema.ObjectId, ref: "User"},
  productName: String,
  description: String,
  brand:String,
  price: String,
  dateCreated : {type: Date, default : Date.now}
}, {collection:'product'});

module.exports = ProductSchema;
