const express = require("express");
const router = express.Router();

// Require controllers modules
const user_controller = require("../controllers/userController");

// GET request to sign in.
router.get("/user/sign-up", user_controller.user_sign_in_get);

// POST request for creating User.
router.post("/user/sign-up", user_controller.user_sign_in_post);

// GET request to log in.
router.get("/user/log-in", user_controller.user_log_in_get);

// POST request to log in.
router.post("/user/log-in", user_controller.user_log_in_post);

module.exports = router;
