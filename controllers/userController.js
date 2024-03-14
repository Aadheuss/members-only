const debug = require("debug");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");

// Display user create form on GET.
exports.user_sign_in_get = (req, res, next) => {
  res.render("user_sign_in_form", { title: "Sign in" });
};

// Handle User create on POST.
exports.user_sign_in_post = [
  // Validate and sanitize fields.
  body("first_name", "First name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password_confirmation", "Password validation must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      const validPassword = value === req.body.password;
      if (!validPassword) {
        throw new Error("Password confirmation does'nt match!");
      }
      return validPassword;
    }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("user_sign_in_form", {
        title: "Sign in",
        user: user,
        password_confirmation: req.body.password_confirmation,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save user.
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        // if err, do something
        if (err) {
          return next(err);
        }

        // otherwise, store hashedPassword in DB
        const hashedUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashedPassword,
        });

        await hashedUser.save();
        res.redirect("/users/user/log-in");
      });
    }
  }),
];

// Display user login form on GET.
exports.user_log_in_get = (req, res, next) => {
  const message = req.session.messages[req.session.messages.length - 1];
  res.render("user_log_in_form", { title: "Log in", message: message });
};

// Display user login form on GET.
exports.user_log_in_post = [
  // Validate and sanitize fields.
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("user_log_in_form", {
        title: "Log in",
        username: req.body.username,
        password: req.body.password,
        errors: errors.array(),
      });
    } else {
      next();
    }
  }),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/user/log-in",
    failureMessage: true,
  }),
];
