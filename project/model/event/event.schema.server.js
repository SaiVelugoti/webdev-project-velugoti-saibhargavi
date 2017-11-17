var mongoose = require("mongoose");
var EventSchema = mongoose.Schema({
  regUserId: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
  eventName: String,
  eventURL: String
}, { collection: 'event'});

module.exports = EventSchema;