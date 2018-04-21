const mongoose = require("mongoose");
const ReviewSchema = require("./review.schema.server");
const ProductSchema = require("../product/product.schema.server");
const ReviewModel = mongoose.model("ReviewModel", ReviewSchema);
const ProductModel = mongoose.model("ProductModel", ProductSchema);

ReviewModel.createReview = createReview;
ReviewModel.findReviewById = findReviewById;
ReviewModel.findAllReviewsForUser = findAllReviewsForUser;
ReviewModel.findAllReviewsForProduct = findAllReviewsForProduct;
ReviewModel.updateReview = updateReview;
ReviewModel.deleteReview = deleteReview;

module.exports = ReviewModel;

function createReview(review){
  return ReviewModel.create(review)
    .then(function (review) {
      ProductModel.findOne({_id: review._product})
        .then(function (product) {
          product.reviews.push(review);
          product.save();
          })
      });
}

function findReviewById(reviewId){
  return ReviewModel.findById({_id: reviewId});
}

function findAllReviewsForUser(userId) {
  return ReviewModel.find({_user: userId})
    .populate('_user', 'username')
    .populate('_product', 'productName')
    .exec();
}

function findAllReviewsForProduct(productId) {
  return ReviewModel.find({_product: productId})
    .populate('_product', 'productName')
    .populate('_user', 'username')
    .exec();
}

function updateReview(reviewId, review){
  return ReviewModel.update({_id: reviewId}, review);
}

function deleteReview(reviewId) {
  return ReviewModel.findOne({_id: reviewId})
    .then(function (review) {
      ProductModel.findOne(review._product)
        .then(function (product) {
          for (let i = 0; i < product.reviews.length; i++) {
            if (product.reviews[i].equals(reviewId)) {
              product.reviews.splice(i, 1);
              product.save();
              break;
            }
          }
          return ReviewModel.remove({_id: reviewId});
        })
    })
}
