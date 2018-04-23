var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../dist/assets/uploads' });

module.exports = function (app) {
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/username/:username", findUserByUsername);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get("/api/userType/:userType", findUsersByType);
  app.get("/api/user/:userId/followers", findFollowersForUser);
  app.get("/api/user/:userId/followings", findFollowingsForUser);
  app.get("/api/user/:userId/favorites", findFavoritesForUser);
  app.get("/api/follower/:followerId/followee/:followeeId", addFollow);
  app.delete("/api/follower/:followerId/followee/:followeeId", deleteFollow);
  app.put("/api/user/:userId/product/:productId", addFavorite);
  app.delete("/api/user/:userId/product/:productId", deleteFavorite);
  app.get("/api/allUser", findAllUsers);
  app.get("/api/allReviewer", findAllReviewers);
  app.get("/api/userLike/:username", findUsersByUsernameLike);
  app.get("/api/reviewerLike/:username", findReviewersByUsernameLike);

  app.post('/api/logout', logout);
  app.post ('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post ('/api/loggedIn', loggedIn);

  app.post ("/api/userUpload", upload.single('myFile'), uploadImage);

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  var userModel = require("../models/user/user.model.server");

  function uploadImage(req, res) {
    const callbackUrl = '/profile';
    var userId = req.body.userId;
    var myFile = req.file;
    var filename = myFile.filename;     // new file name in upload folder
    userModel.findUserById(userId)
      .then(function (user) {
        user.photo = "/assets/uploads/" + filename;
        userModel.updateUser(userId, user)
          .then(
            function(any){
              console.log("upload successfully: " + user.photo);
              res.redirect(callbackUrl);
            },
            function (err) {
              console.log(err);
              res.status(500).send(err);
            })
      })

  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.status(200).json(user);
              }
            });
          } else {
            res.status(500).send('Cannot create new user');
          }
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function logout(req, res) {
    req.logOut();
    console.log("successfully logout");
    res.sendStatus(200);
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
      .then(function (targetUser) {
        let followers = [];
        let index = 0;
        let promise = userModel.findUserById(targetUser.followers[index]);
          for (var i = 1; i < targetUser.followers.length; i++) {
            promise = promise.then(user => {
              followers.push(user);
              index++;
              return userModel.findUserById(targetUser.followers[index]);
            })
          }
          return promise.then( user => {
            if (user) {
              followers.push(user);
            }
            console.log("find followers for user: userId = " + userId);
            console.log("total: " + followers.length + " followers");
            res.status(200).json(followers);
          }
          )

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
      .then(function (targetUser) {
          let followings = [];
          let index = 0;
          let promise = userModel.findUserById(targetUser.followings[index]);
          for (var i = 1; i < targetUser.followings.length; i++) {
            promise = promise.then(user => {
              followings.push(user);
              index++;
              return userModel.findUserById(targetUser.followings[index]);
            })
          }
          return promise.then(user => {
              if (user != null) {
                followings.push(user);
              }
              console.log("find followings for user: userId = " + userId);
              console.log("total: " + followings.length + " followings");
              res.status(200).json(followings);
            }
          )

        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findFavoritesForUser(req, res){
    var userId = req.params["userId"];
    userModel
      .findFavoritesForUser(userId)
      .then(function (user) {
          // console.log(user);
          // console.log("find favorites for user: userId = " + userId);
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
          //console.log(status);
          res.status(200).send("add follow success!");
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
      .then(function (followee) {
          console.log("delete follow: followerId = " + followerId + " followeeId = " + followeeId);
          res.status(200).json("delete follow success!");
        },
        function (err) {
          console.log(err);
          res.status(500).json(err);
        });
  }

  function addFavorite(req, res){
    var userId = req.params["userId"];
    var productId = req.params["productId"];
    userModel
      .addFavorite(userId, productId)
      .then(function (status) {
          // console.log("add favorite: userId = " + userId + " productId :" + productId);
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
          // console.log("delete favorite: userId = " + userId + " productId = " + productId);
          res.status(200).json({});
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

  function findUsersByUsernameLike(req, res) {
    var username = req.params["username"];
    userModel.findUsersByUsernameLike(username)
      .then(
        function (users){
          console.log("find users by username like");
          res.json(users);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findReviewersByUsernameLike(req, res) {
    var username = req.params["username"];
    userModel.findReviewersByUsernameLike(username)
      .then(
        function (users){
          console.log("find reviewers by username like");
          res.json(users);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findAllReviewers(req, res) {
    userModel.findAllReviewers()
      .then(
        function (users){
          console.log("find all reviewers");
          res.json(users);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }

  function findUserByUsername(req, res) {
    var username = req.params["username"];
    userModel.findUserByUsername(username)
      .then(
        function (users){
          console.log("find user by username: " + username);
          res.json(users);
        },
        function (err) {
          console.log(err);
          res.status(500).send(err);
        });
  }
};
