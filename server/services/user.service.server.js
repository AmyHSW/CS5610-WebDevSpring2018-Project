var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
  app.put("/api/follower/:followerId/followee/:followeeId", addFollow);
  app.delete("/api/follower/:followerId/followee/:followeeId", deleteFollow);
  app.put("/api/user/:userId/product/:productId", addFavorite);
  app.delete("/api/user/:userId/product/:productId", deleteFavorite);
  app.get("/api/user/all", findAllUsers);

  app.post('/api/login', passport.authenticate('local'), login);
  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  var userModel = require("../models/user/user.model.server");

  function localStrategy(username, password, done) {
    userModel
      .findUserByCredentials(username, password)
      .then(
        function(user) {
          if(user.username === username && user.password === password) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    developerModel
      .findDeveloperById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }


  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function(user){
        console.log("create user: " + user);
          res.json(user);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findUser(req, res){
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password){
      userModel.findUserByCredentials(username, password)
        .then(function(user){
          console.log("find user by credential: " + user);
          res.json(user);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
    } else {
      userModel.findUserByUserName(username)
        .then(function(user){
          console.log("find user by username: " + user);
          res.json(user);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
    }
  }

  function findUserById(req, res){
    var userId = req.params["userId"]
    userModel.findUserById(userId).then(
      function (user){
        console.log("find user by id: " + user);
        res.json(user);
      },
      function (err) {
        console.log(err);
        res.status(500).send(err);
      });
  }

  function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;

    userModel.updateUser(userId, user)
      .then(
        function(status){
          console.log("update user: userId = " + userId);
          res.send(status);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
      .deleteUser(userId)
      .then(function (status) {
          console.log("delete user: userId = " + userId);
          res.send(status);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findUsersByType(req, res){
    var userType = req.params["userType"];
    userModel
      .findUsersByType(userType)
      .then(function (user) {
        console.log("find users by type: type = " + userType);
        res.json(user);
      },
      function (err) {
        console.log(err);
        res.status(500).send(err);
      });
  }

  function findFollowersForUser(req, res){
    var userId = req.params["userId"];
    userModel
      .findUserById(userId)
      .then(function (user) {
          console.log("find followers for user: userId = " + userId);
          res.status(200).json(user.followers);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findFollowingsForUser(req, res){
    var userId = req.params["userId"];
    userModel
      .findUserById(userId)
      .then(function (user) {
          console.log("find followings for user: userId = " + userId);
          res.status(200).json(user.followings);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findFavoritesForUser(req, res){
    var userId = req.params["userId"];
    userModel
      .findUserById(userId)
      .then(function (user) {
          console.log("find favorites for user: userId = " + userId);
          res.status(200).json(user.favorites);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function addFollow(req, res){
    var followerId = req.params["followerId"];
    var followeeId = req.params["followeeId"];
    userModel
      .addFollow(followerId, followeeId)
      .then(function (status) {
          console.log("add follow: followerId = " + followerId + " followeeId = " + followeeId);
          res.json(status);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function deleteFollow(req, res){
    var followerId = req.params["followerId"];
    var followeeId = req.params["followeeId"];
    userModel
      .deleteFollow(followerId, followeeId)
      .then(function (status) {
          console.log("delete follow: followerId = " + followerId + " followeeId = " + followeeId);
          res.json(status);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function addFavorite(req, res){
    var userId = req.params["userId"];
    var productId = req.params["productId"];
    userModel
      .addFavorite(userId, productId)
      .then(function (status) {
          console.log("add favorite: userId = " + userId);
          res.json(status);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function deleteFavorite(req, res){
    var userId = req.params["userId"];
    var productId = req.params["productId"];
    userModel
      .deleteFavorite(userId, productId)
      .then(function (status) {
          console.log("delete favorite: userId = " + userId);
          res.json(status);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findAllUsers(req, res){
    userModel.findAllUsers().then(
      function (users){
        console.log("find all users");
        res.json(users);
      },
      function (err) {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
