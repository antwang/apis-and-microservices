const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  username: { type: String, unique: true }
});

module.exports = mongoose.model("user", user);
