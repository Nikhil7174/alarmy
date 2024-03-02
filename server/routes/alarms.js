const express = require("express");
const auth = require("../middleware/auth");
const {
  createAlarm,
  updateAlarm,
  deleteAlarm,
  fetchallAlarms,
} = require("../controller/alarm");

const router = express.Router();

router.get("/fetchallAlarms", auth, fetchallAlarms);

router.post("/createAlarm", auth, createAlarm);

router.put("/updateAlarm/:id", auth, updateAlarm);

router.delete("/deleteAlarm/:id", auth, deleteAlarm);

module.exports = router;
