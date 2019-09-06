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

// @router api/post/:id
// @desc get post by id

// Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("user", [
        "name",
        "avatar"
      ]);
      console.log(post);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      //   console.log(error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @router api/post

// @des get all posts
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("user", ["name", "avatar"])
        .sort({ date: -1 });

      if (!posts) {
        return res.status(404).json({ msg: "Not found post" });
      }
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

// @ruter api/posts/like/:id
// @des add like in post
// @access Private

router.put(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const foundpost = await Post.findById(req.params.id);
    // check the post has already been liked
    if (
      foundpost.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "You already liked this post" });
    }

    foundpost.likes.unshift({ user: req.user.id });

    await foundpost.save();
    res.json(foundpost);
  }
);

// @router api/posts/unlike/:id
// @desc unlike post
// @access Private

router.put(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // check the post has been liked or not

      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(404).json({ msg: "You didn't like not yet" });
      }

      // removeIndex
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status("500").json({ msg: "Server Error" });
    }
  }
);
// @router api/post/comment/id
// desc comment by post id
// access private

router.post(
  "/comment/:id",
  check("text", "the is field is required")
    .not()
    .isEmpty(),
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post);
    } catch (error) {}
  }
);

// router api/posts/:post_id/:comment_id
// @desc delete comment by post and comment id
// access private

router.delete(
  "/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      if (!post) {
        return res.json(404).json({ msg: "the post not found" });
      }
      const removeIndex = post.comments
        .map(comment => comment.id.toString())
        .indexOf(req.params.comment_id);

      if (removeIndex === -1) {
        return res.status(500).json({ msg: "Server Error" });
      }
      post.comments.splice(removeIndex, 1);
      await post.save();
      res.json({ msg: "Comment deleted" });
    } catch (error) {
      res.json({ error: "Server Error" });
    }
  }
);

module.exports = router;
