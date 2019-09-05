const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route GET api/posts
// @des test route

// @access Public

router.get("/test", (req, res) => res.send("posts Route"));

// @router api/posts
// @desc add posts
// @Access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  [
    check("text", "text is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      await newPost.save();
      res.json(newPost);
    } catch (error) {
      res.status(500).json({ msg: "Server Errors" });
    }
  }
);

module.exports = router;
