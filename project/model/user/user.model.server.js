var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.findAll = findAll;
UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.addToFollow = addToFollow;
// UserModel.findUsersFollowing = findUsersFollowing;
// UserModel.findUsersFollowedBy = findUsersFollowedBy;


module.exports = UserModel;

function findAll() {
  return UserModel.find();
}

// function findUsersFollowedBy(userId) {
//   return UserModel.
//
// }
// findUsersFollowing


function createUser(user) {
  return UserModel.create(user);
}

function findUserById(userId) {
  return UserModel.findOne({_id: userId});
}

function findUserByUsername(username) {
  return UserModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
  return UserModel.update({_id: userId}, user);
}

function deleteUser(userId) {
  return UserModel.deleteOne({_id: userId});
}

function addToFollow(userId, followingId) {
  var currentUserId = userId;
  var newFollowing = followingId;
  UserModel.findUserById(currentUserId)
    .then(function (user) {
      UserModel.findUserById(newFollowing)
        .then(function (followingUser) {
          user.followingUsers.push(followingUser);
           user.save();
        });
    });
  UserModel.findUserById(newFollowing)
    .then(function (user) {
      UserModel.findUserById(currentUserId)
        .then(function (thisUser) {
          user.followedBy.push(thisUser);
           user.save();
        });
    });
  return;
}
