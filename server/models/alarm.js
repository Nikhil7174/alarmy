const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
  user: String,
  name: String,
  description: String,
  isSet: Boolean,
  time: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const AlarmMessage = mongoose.model("AlarmMessage", alarmSchema);

module.exports = AlarmMessage;
