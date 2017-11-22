module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  app.post("/api/user", createUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.put("/api/user/:userId/following/:followingId", addToFollowList);
  app.put("/api/user/:userId/unFollow/:followingId", removeFromFollowList);
  app.get("/api/user/:userId/dashboard/followedBy", findUsersFollowedBy);
  app.get("/api/user/:userId/dashboard/following", findUsersFollowing);
  app.get("/api/users/", findAllUsers);
  app.put("/api/user/:followingId/followedBy/:userId", addToFollowedBy);
  app.put("/api/user/:followingId/unfollowedBy/:userId", removeFromFollowedBy);



  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function (user) {
        res.json(user);
      });
  }

  function findUsersFollowing(req, res) {
    var userId = req.params["userId"];
    return userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);

      });
  }
  function findUsersFollowedBy(req, res) {
    var userId = req.params["userId"];
    return userModel.findUsersFollowedBy(userId)
      .then(function (users) {
        res.json(users);

      });
  }
  function addToFollowList(req, res) {
    var followingId = req.params["followingId"];
    var userId = req.params["userId"];
   return userModel.addToFollow(userId, followingId)
      .then(function (user) {
        res.json(user);
      });
  }

  function addToFollowedBy(req, res) {
    var followingId = req.params["followingId"];
    var userId = req.params["userId"];
    return userModel.addToFollowedBy(userId, followingId)
      .then(function (user) {
        res.json(user);
      });

  }
  function removeFromFollowList(req, res) {
    var unfollowId = req.params["followingId"];
    var userId = req.params["userId"];
    return userModel.removeFromFollow(userId, unfollowId)
      .then(function (user) {
        res.json(user);
      });
  }

  function removeFromFollowedBy(req, res) {
    var unfollowedById = req.params["followingId"];
    var userId = req.params["userId"];
    return userModel.removeFromFollowedBy(userId, unfollowedById)
      .then(function (user) {
        res.json(user);
      });
  }

  function findAllUsers(req, res) {
    console.log("In findAllUsers - UserService")
    userModel.findAll()
      .then(function (users) {
        if (users) {
          res.json(users);
        } else {
          res.json(null);
        }

      });
    return;

  }

  function findUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    if (username && password) {
      userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.json(null);
          }
        });
      return;

    } else if (username) {
      userModel
        .findUserByUsername(username)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.json(null);
          }
        });
      return;
    }
    return res.json({});
  }

  function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
      .findUserById(userId)
      .then(function (user) {
        if (user) {
          res.json(user);
        } else {
          res.json(null);
        }
      });
    return;
    // var user;
    // for (let x = 0; x < users.length; x++) {
    //   if (users[x]._id === userId) {
    //     user = users[x];
    //   }
    // }
    // if (user) {
    //   res.json(user);
    // } else {
    //   res.json(null);
    // }
  }

  function updateUser(req, res) {

    var userId = req.params['userId'];
    var userBody = req.body;
    userModel.updateUser(userId, userBody)
      .then(function (returnedUser) {
        res.json(returnedUser);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    //var user = req.body;
    userModel.deleteUser(userId)
      .then(function (user) {
        res.json(user);
      });
  }
}
