const PostMessage = require("../models/postMessage");
const mongoose = require("mongoose");

const getAlarms = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
    const total = await PostMessage.countDocuments({});
    const post = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: post,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const upcomingAlarm = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Query -> /posts?page=1  -> page=1
//Params -> /posts/123    -> id=123

const createAlarm = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage(post);
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// /post/id
const updateAlarm = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("no post with that id");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

const deleteAlarm = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("no post with that id");
  }
  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: "Post deleted successfully" });
};

module.exports = {
  createAlarm,
  getAlarms,
  upcomingAlarm,
  deleteAlarm,
  updateAlarm,
};
