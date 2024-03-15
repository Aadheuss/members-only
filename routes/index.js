const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Require models
const User = require("../models/user");
const Message = require("../models/message");

const indexController = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({})
    .sort({ timestamp: 1 })
    .populate("author")
    .exec();

  res.render("index", {
    title: "Members only",
    user: req.user,
    message_list: allMessages,
  });
});
/* GET home page. */
router.get("/", indexController);

module.exports = router;
