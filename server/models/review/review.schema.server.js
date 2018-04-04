const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  _product: {type: mongoose.Schema.ObjectId, ref: 'ProductModel'},
  _user: {type: mongoose.Schema.ObjectId, ref: 'UserModel'},
  summary: String,
  content: String,
  rating: Number,
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'review'});

module.exports = ReviewSchema;




