
module.exports = function (app) {
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get("/api/userType/:userType", findUsersByType);
  app.get("/api/user/:userId/followers", findFollowersForUser);
  app.get("/api/user/:userId/followings", findFollowingsForUser);
  app.get("/api/user/:userId/favorites", findFavoritesForUser);
  app.put("/api/add/follower/:followerId/followee/:followeeId", addFollow);
  app.put("/api/delete/follower/:followerId/followee/:followeeId", deleteFollow);
  //app.put("/api/add/user/:userId/product/:productId", addFavorite);
  //app.put("/api/delete/user/:userId/product/:productId", deleteFavorite);

  var userModel = require("../models/user/user.model.server");

  //helper functions -- can be removed after testing
  app.get("/api/user/findall", findAllUsers);
  function findAllUsers(req, res) {
    userModel
      .findAllUsers()
      .then(function (users) {
          res.send(users);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function(user){
        //console.log("add")
          res.json(user);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function findUser(req, res){
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password){
      userModel.findUserByCredentials(username, password)
        .then(function(user){
          res.json(user);
        //console.log(user);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
    } else {
      userModel.findUserByUserName(username)
        .then(function(user){
          res.json(user);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
    }
  }

  function findUserById(req, res){
    var userId = req.params["userId"]
    userModel.findUserById(userId).then(
      function (user){
        res.json(user);
      },
      function (err) {
        res.sendStatus(404).send(err);
      });
  }

  function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;

    userModel.updateUser(userId, user)
      .then(
        function(status){
          res.send(status);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
      .deleteUser(userId)
      .then(function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function findUsersByType(req, res){
    var userType = req.params["userType"];
    userModel
      .findUsersByType(userType)
      .then(function (user) {
        res.json(user);
      },
      function (err) {
        res.sendStatus(404).send(err);
      });
  }

  function findFollowersForUser(req, res){
    var userId = req.params["userId"];
    userModel
      .findFollowersForUser(userId)
      .then(function (followers) {
          res.json(followers);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function findFollowingsForUser(req, res){
    var userId = req.params["userId"];
    userModel
      .findFollowersForUser(userId)
      .then(function (followings) {
          res.json(followings);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function findFavoritesForUser(req, res){
    var userId = req.params["userId"];
    userModel
      .findFollowersForUser(userId)
      .then(function (favorites) {
          res.json(favorites);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function addFollow(req, res){
    var followerId = req.params["followerId"];
    var followeeId = req.params["followeeId"];
    userModel
      .addFollow(followerId, followeeId)
      .then(function (status) {
          res.json(status);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function deleteFollow(req, res){
    var followerId = req.params["followerId"];
    var followeeId = req.params["followeeId"];
    userModel
      .deleteFollow(followerId, followeeId)
      .then(function (status) {
          res.json(status);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }
}
