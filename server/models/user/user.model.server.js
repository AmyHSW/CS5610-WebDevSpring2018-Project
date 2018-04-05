var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);
var UserModel2 = mongoose.model("UserModel2", UserSchema);

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
//UserModel. addFavorite =  addFavorite;
//UserModel. deleteFavorite =  deleteFavorite;


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
  return UserModel.findById(userId).followers;
}

function findFollowingsForUser(userId) {
  return UserModel.findById(userId).followings;
}

function findFavoritesForUser(userId) {
  return UserModel.findById(userId).favorites;
}

function addFollow(followerId, followeeId) {
  return UserModel.findOne({_id:followeeId}, function (err,user) {
      console.log(user);
      var followers = user.followers;
      followers.push(UserModel.findById(followerId));
      UserModel.findOne({id:followerId}, function (err,user) {
        console.log(user);
        var followings = user.followings;
        followings.push(UserModel.findById(followeeId));
      })
    });
}

function deleteFollow(followerId, followeeId) {
  return UserModel.findOne(followeeId)(function (err,user) {
    var followers = user.followers;
    for (var i = 1; i < followers.length; i++) {
      if (followers[i]._id === followerId) {
        followers.splice(i, 1);
      }
    }
    UserModel.findOne(followerId)(function (err,user) {
      var followings = user.followings;
      for (var i = 1; i < followings.length; i++) {
        if (followings[i]._id === followeeId) {
          followings.splice(i, 1);
        }
      }
    });
  })
}



