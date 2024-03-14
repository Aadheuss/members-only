const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);