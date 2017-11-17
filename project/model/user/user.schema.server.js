var mongoose = require("mongoose");
var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  followingUsers: [String],
  followedBy: [],
  // followingUsers: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
  // followedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
  eventsSaved: [{type: mongoose.Schema.Types.ObjectId, ref: "EventModel"}],
  websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
  dateCreated: {type: Date, default: Date.now()}
}, {collection: 'user'});

module.exports = UserSchema;
