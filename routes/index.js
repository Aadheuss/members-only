const express = require("express");
const passport = require("../config/passport");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members only", user: req.user });
});

module.exports = router;
