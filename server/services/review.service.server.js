module.exports = function (app) {

  const reviewModel = require("../models/review/review.model.server");

  app.post("/api/user/:userId/product/:productId/review", createReview);
  app.get("/api/user/:userId/review", findAllReviewsForUser);
  app.get("/api/product/:productId/review", findAllReviewsForProduct);
  app.get("/api/review/:reviewId", findReviewById);
  app.put("/api/review/:reviewId", updateReview);
  app.delete("/api/review/:reviewId", deleteReview);

  function createReview(req, res) {
    const productId = req.params['productId'];
    const userId = req.params['userId'];
    const review = req.body;
    review._user = userId;
    review._product = productId;
    reviewModel.createReview(review)
      .then(function(response) {
        console.log('created review: ' + response);
        reviewModel.findAllReviewsForUser(userId)
          .then(function (reviews){
            res.status(200).json(reviews);
          })
      }, function(err){
        console.log(err);
        res.status(500);
      });
  }

  function findAllReviewsForUser(req, res) {
    const userId = req.params['userId'];
    reviewModel.findAllReviewsForUser(userId)
      .then(function(reviews) {
        res.status(200).json(reviews);
        console.log('found all reviews for user:\n' + reviews);
      }, function(err) {
        console.log(err);
        res.status(500);
      });
  }

  function findAllReviewsForProduct(req, res) {
    const productId = req.params['productId'];
    reviewModel.findAllReviewsForProduct(productId)
      .then(function(reviews) {
        res.status(200).json(reviews);
        console.log('found all reviews for product:\n' + reviews);
      }, function(err) {
        console.log(err);
        res.status(500);
      });
  }

  function findReviewById(req, res) {
    const reviewId = req.params['reviewId'];
    reviewModel.findReviewById(reviewId)
      .then(function(review){
        console.log('found review by id:\n' + review);
        res.status(200).json(review);
      }, function(err) {
        console.log(err);
        res.status(500);
      });
  }

  function updateReview(req, res) {
    const reviewId = req.params['reviewId'];
    const review = req.body;
    reviewModel.updateReview(reviewId, review)
      .then(function(response) {
        res.status(200).json({});
        console.log('updated review: reviewId = ' + reviewId);
      }, function(err) {
        console.log(err);
        res.status(500);
      });
  }

  function deleteReview(req, res) {
    const reviewId = req.params['reviewId'];
    reviewModel.deleteReview(reviewId)
      .then(function(response){
        res.status(200).json({});
        console.log('deleted review: reviewId = ' + reviewId);
      }, function(err) {
        console.log(err);
        res.status(500);
      });
  }
};
