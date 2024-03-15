const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Message = require("../models/message");

// Display message create on GET.
exports.message_create_get = (req, res, next) => {
  res.render("message_create_form", { title: "Create a message" });
};

// Display message create on POST.
exports.message_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("text", "text must not be empty").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Message object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user._id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("message_create_form", {
        title: "Create a message",
        message: message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
