const express = require("express");
const router = express.Router();
const Alarm = require("../models/alarm");
var auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

//Route-1 Get all alarms of logged in users using: get '/api/alarms/fetchallalarms'. login required
const fetchallAlarms = async (req, res) => {
  try {
    const alarms = await Alarm.find({ user: req.user.id });
    res.json(alarms);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
};

//Route-2 Add a new alarm of logged in users using: post '/api/alarms/addalarm'. login required
const createAlarm = async (req, res) => {
  try {
    const { name, description, time, isSet } = req.body;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const alarm = new Alarm({
      name,
      description,
      time,
      isSet,
      user: req.user.id,
    });
    const savealarms = await alarm.save();

    res.json(savealarms);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
};

//Route-3 Update n existing alarm of logged in users using: put '/api/alarms/addalarm'. login required
const updateAlarm =
  (auth,
  async (req, res) => {
    const { user, name, description, time, isSet } = req.body;
    try {
      //create a alarm object
      const newalarm = {};
      if (user) {
        newalarm.user = user;
      }
      if (name) {
        newalarm.name = name;
      }
      if (description) {
        newalarm.description = description;
      }
      if (time) {
        newalarm.time = time;
      }
      if (isSet) {
        newalarm.isSet = isSet;
      }

      // Find the alarm to be updated and update it
      let alarm = await Alarm.findById(req.params.id);
      console.log(alarm);
      if (!alarm) {
        return res.status(404).send("Not found");
      }

      if (alarm.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }

      alarm = await Alarm.findByIdAndUpdate(
        req.params.id,
        { $set: newalarm },
        { new: true }
      );
      res.json({ alarm });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  });

//Route-4 Delete an existing alarm of logged in users using: delete '/api/alarms/deletealarm'. login required
const deleteAlarm = async (req, res) => {
  try {
    // Find the alarm to be deleted and delete it
    let alarm = await Alarm.findById(req.params.id);
    if (!alarm) {
      return res.status(404).send("Not found");
    }

    //allow deletion only if user is the owner of the alarm
    if (alarm.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    alarm = await Alarm.findByIdAndDelete(req.params.id);
    res.json({ sucess: "alarm has been deleted", alarm: alarm });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
};

module.exports = { createAlarm, updateAlarm, deleteAlarm, fetchallAlarms };
