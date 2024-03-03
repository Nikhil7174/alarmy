const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const AlarmModel = require("../models/alarm");

const alarmRouter = express.Router();
alarmRouter.use(auth);

alarmRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, "@one", async (err, decode) => {
    try {
      let data = await AlarmModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "Success",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

alarmRouter.get("/nearest", async (req, res) => {
  try {
    let token = req.headers.authorization;
    jwt.verify(token, "@one", async (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid, please login",
          status: 2,
        });
      }

      const alarms = await AlarmModel.find({ user: decode.userId });

      if (!alarms || alarms.length === 0) {
        return res.status(404).json({
          message: "No alarms found",
          status: 0,
        });
      }

      // Sort alarms based on the closest time to the current time
      alarms.sort((a, b) => {
        const timeA = new Date(a.time).getTime() - Date.now();
        const timeB = new Date(b.time).getTime() - Date.now();
        return Math.abs(timeA) - Math.abs(timeB);
      });

      res.status(200).json({
        data: alarms,
        message: "Success",
        status: 1,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 0,
    });
  }
});

alarmRouter.post("/create", async (req, res) => {
  try {
    let alarm = new AlarmModel(req.body);
    console.log(alarm);
    await alarm.save();
    res.send({
      message: "alarm created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

alarmRouter.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await AlarmModel.findByIdAndUpdate({ _id: id }, req.body);
    console.log(req.body, " req.body ");
    res.send({
      message: "alarm updated",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

alarmRouter.delete("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await AlarmModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "alarm deleted",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = alarmRouter;
