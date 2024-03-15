const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership: { type: Boolean, default: false },
  is_admin: { type: Boolean, default: false },
});

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
