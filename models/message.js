const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

MessageSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED); // format 'YYYY-MM-DD'
});

MessageSchema.virtual("url").get(function () {
  return `/users/user/message/${this._id}`;
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
