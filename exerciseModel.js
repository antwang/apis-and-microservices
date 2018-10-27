// 模型
const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const exercise = new Schema({
  userId: { type: String, unique: true },
  description: { type: String },
  duration: { type: Number },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("exercise", exercise);
