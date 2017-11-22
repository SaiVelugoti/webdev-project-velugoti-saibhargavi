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
UserModel.removeFromFollow = removeFromFollow;
UserModel.addToFollowedBy = addToFollowedBy;
UserModel.removeFromFollowedBy = removeFromFollowedBy;
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
  return UserModel.update({_id: userId}, {$push: {followingUsers: followingId}});
}

function addFollowers(userId, followedById) {
  "use strict";
  return UserModel.update({_id: userId}, {$push: {followedBy: followedById}});
}

function removeFromFollow(userId, unFollowId) {
return UserModel.update({_id: userId}, {$pullAll: {followingUsers: [unFollowId]}});
}

function addToFollowedBy(userId, followingId) {
  // "use strict";
  return UserModel.update({_id: followingId}, {$push: {followedBy: userId}});
}

function removeFromFollowedBy(userId, unfollowedById) {
  // "use strict";
  return UserModel.update({_id: unfollowedById}, {$pullAll: {followedBy: [userId]}});
}
  // UserModel.update({_id:followingId}, {$push: {followedBy: userId}});
  // return;
  // var currentUserId = userId;
  // var newFollowing = followingId;
  // var existingUser;
  // var followingUser;
  // UserModel.findUserById(currentUserId)
  //   .then(function (user) {
  //     console.log("In User Model Server")
  //     existingUser=user;
  //     console.log("existingUser" + existingUser);
  //     UserModel.findUserById(newFollowing)
  //       .then(function (usernew) {
  //         followingUser=usernew;
  //         console.log("followingUser"+followingUser);
  //         existingUser.followingUsers.push(followingUser);
  //         // UserModel.update({_id:currentUserId}, {$push: {followingUsers: followingUser._id}});
  //         existingUser.save();
  //         followingUser.followedBy.push(existingUser);
  //         // UserModel.updateOne({_id:newFollowing}, {$addToSet: {followedBy: currentUserId}});
  //         followingUser.save();
  //       });
  //   });
  //
  //  return UserModel.findOne({_id: userId});
  // UserModel.findUserById(newFollowing)
  //   .then(function (user) {
  //     UserModel.findUserById(currentUserId)
  //       .then(function (thisUser) {
  //         user.followedBy.push(thisUser);
  //          user.save();
  //       });
  //   });
  // return;
