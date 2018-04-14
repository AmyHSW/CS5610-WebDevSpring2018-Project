const mongoose = require("mongoose");
const ReviewSchema = require("./review.schema.server");
const ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

ReviewModel.createReview = createReview;
ReviewModel.findReviewById = findReviewById;
ReviewModel.findAllReviewsForUser = findAllReviewsForUser;
ReviewModel.findAllReviewsForProduct = findAllReviewsForProduct;
ReviewModel.updateReview = updateReview;
ReviewModel.deleteReview = deleteReview;

module.exports = ReviewModel;

function createReview(review){
  return ReviewModel.create(review);
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
  return ReviewModel.remove({_id: reviewId});
}
