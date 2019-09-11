const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const keys = config.get("SECRETKEYS");
const validateLoginInput = require("../../validation/login");
const passport = require("passport");
const auth = require("../../middleware/auth");
// @route GET api/users
// @des test route

// @access Public

router.get("/", (req, res) => res.send("User Route"));

router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      } else {
        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        user = new User({
          name,
          email,
          password,
          avatar
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.save();
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt

        jwt.sign(payload, keys, { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/users/login
// @desc login User / returning JWT Token
// @acces public

router.post(
  "/login",
  [
    check("email", "Please include a valid email")
      .not()
      .isEmpty(),
    check("password", "Please enter a password ")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const { email, password } = req.body;

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //   Find user by email

    User.findOne({ email }).then(user => {
      // check for user

      if (!user) {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      // check password

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user Matched

          const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt

          // sign Token
          jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token
            });
          });
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
      });
    });
  }
);

router.get("/current", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Errors" }] });
  }
});

module.exports = router;
