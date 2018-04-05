var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var ProductSchema = require("../product/product.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);
var ProductModel = mongoose.model("ProductModel", ProductSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUserName = findUserByUserName;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.findUsersByType = findUsersByType;
UserModel.findFollowersForUser = findFollowersForUser;
UserModel.findFollowingsForUser = findFollowingsForUser;
UserModel. findFavoritesForUser =  findFavoritesForUser;
UserModel. addFollow =  addFollow;
UserModel. deleteFollow =  deleteFollow;
UserModel. addFavorite =  addFavorite;
UserModel. deleteFavorite =  deleteFavorite;


//helper functions -- delete after testing
function findAllUsers(){
  UserModel.find(function (err, doc) {
    console.log(docs);
  })
}

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

function findUserByUserName(username){
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

function findFollowersForUser(userId) {
  UserModel.findOne({_id:userId}, function (err, user) {
    console.log(user);
    console.log(user.followers.length);
    return user.followers;
  });
}

function findFollowingsForUser(userId) {
  return UserModel.findById(userId).followings;
}

function findFavoritesForUser(userId) {
  return UserModel.findById(userId).favorites;
}

function addFollow(followerId, followeeId) {
  return UserModel.findOne({_id:followeeId}, function (err,followee) {
    UserModel.findOne({_id:followerId}, function (err,follower) {
      followee.followers.push(Object.assign(follower));
      follower.followings.push(Object.assign(followee));
      console.log('second' + ' ' + followee.followers.length);
    })
    console.log(followee);
    console.log('first' + ' ' + followee.followers.length);
  })
}

function deleteFollow(followerId, followeeId) {
  return UserModel.findOne({_id: followeeId}, function (err, user) {
    var followers = user.followers;
    for (var i = 1; i < followers.length; i++) {
      if (followers[i]._id === followerId) {
        followers.splice(i, 1);
      }
    }
    //console.log(user.followers.length);
    UserModel.findOne({_id: followeeId}, function (err, user) {
      var followings = user.followings;
      for (var i = 1; i < followings.length; i++) {
        if (followings[i]._id === followeeId) {
          followings.splice(i, 1);
        }
      }
    });
  });
}

function addFavorite(userId, productId) {
  return UserModel.findOne({_id:userId}, function (err, user) {
    user.favorites.push(ProductModel.findById(productId));
  })
}

function deleteFavorite(userId, productId) {
  return UserModel.findOne({_id:userId}, function (err, user) {
    var favorites = user.favorites;
    for (var i = 1; i < favorites.length; i++) {
      if (favorites[i]._id === productId) {
        favorites.splice(i, 1);
      }
    }
  })
}




