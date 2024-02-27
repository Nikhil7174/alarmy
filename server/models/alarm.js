const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
  name: String,
  message: String,
  tags: [String],
  selectedFile: String,
  set: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const AlarmMessage = mongoose.model("PostMessage", postSchema);

module.exports = AlarmMessage;
