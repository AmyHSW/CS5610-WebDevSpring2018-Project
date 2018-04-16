var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var ProductSchema = require("../product/product.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);
var ProductModel = mongoose.model("ProductModel", ProductSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.findUsersByType = findUsersByType;
UserModel.addFollow =  addFollow;
UserModel.deleteFollow =  deleteFollow;
UserModel.addFavorite =  addFavorite;
UserModel.deleteFavorite =  deleteFavorite;
UserModel.findAllUsers = findAllUsers;
UserModel.findUsersByUsernameLike = findUsersByUsernameLike;
UserModel.findReviewersByUsernameLike = findReviewersByUsernameLike;
UserModel.findAllReviewers = findAllReviewers;
UserModel.findFavoritesForUser = findFavoritesForUser;

module.exports = UserModel;

function createUser(user){
  //user.followers = new Array(100);
  //user.followings = new Array(100);
  //user.favorites = new Array(100);
  return UserModel.create(user);
}

function findUserById(userId){
  return UserModel.findById(userId);
}

function findUserByUsername(username){
  return UserModel.findOne({username: username});
}

function findUserByCredentials(username, password){
  return UserModel.findOne({username: username, password: password});
}

function updateUser(userId, user){
  return UserModel.update({_id: userId}, user );
}

function deleteUser(userId) {
  return UserModel.remove({_id: userId});
}

function findUsersByType(type) {
  return UserModel.find({type:type});
}

function addFollow(followerId, followeeId) {
  return UserModel.findOne({_id:followeeId})
    .then(function (followee) {
      UserModel.findOne({_id:followerId})
        .then(function (follower) {
          followee.followers.push(follower);
          follower.followings.push(followee);
          followee.save();
          follower.save();
        })
  })
}

function deleteFollow(followerId, followeeId) {
  return UserModel.findOne({_id: followeeId})
    .then(function (followee) {
    UserModel.findOne({_id: followerId})
      .then(function (follower) {
        for (var i = 0; i < followee.followers.length; i++) {
          if (followee.followers[i].equals(followerId)) {
            followee.followers.splice(i, 1);
            return followee.save();
          }
        }
        for (var i = 0; i < follower.followings.length; i++) {
          if (follower.followings[i].equals(followeeId)) {
            follower.followings.splice(i, 1);
            return follower.save();
          }
        }
      })
    })
}

function findFavoritesForUser(userId) {
  return UserModel.findOne({_id: userId})
    .populate({path: 'favorites', model: 'ProductModel'})
    .exec();
}

function addFavorite(userId, productId) {
  return UserModel.findOne({_id:userId})
    .then(function (user) {
      ProductModel.findProductById(productId)
        .then(function(product) {
          product.lastViewed = new Date();
          console.log(product);
          user.favorites.push(product);
          user.save();
          product.save();
      })
    })
}

function deleteFavorite(userId, productId) {
  return UserModel.findOne({_id: userId})
    .then(function (user) {
      //console.log(user);
      for (var i = 0; i < user.favorites.length; i++) {
        if (user.favorites[i].equals(productId)) {
          user.favorites.splice(i, 1);
          return user.save();
        }
      }
    })
}

function findAllUsers() {
  return UserModel.find();
}

function findUsersByUsernameLike(userName) {
  return UserModel.find({username: {'$regex': '.*' + userName + '.*'}});
}

function findReviewersByUsernameLike(userName) {
  return UserModel.find({$and:[{username: {'$regex': '.*' + userName + '.*'}}, {type: "REVIEWER"}]});
}

function findAllReviewers() {
  return UserModel.find({type: "REVIEWER"})
}



