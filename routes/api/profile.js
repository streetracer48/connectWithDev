const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check, validationResult } = require("express-validator/check");

// Load profile model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// @route GET api/profile
// @des test route

// @access Public

router.get("/test", (req, res) => res.send("profile Route"));
// @routes GET api/profile
// @desc Get current user profile
// @access private

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "avatar"]
      );

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  [
    check("status", "status is required")
      .not()
      .isEmpty(),
    check("skills", "Skills are required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      handle,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (handle) profileFields.handle = handle;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    // bUILD SOCIAL OBJECT

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (facebook) profileFields.facebook = facebook;
    if (linkedin) profileFields.linkedin = linkedin;
    if (instagram) profileFields.instagram = instagram;

    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// @router PUT api/profile/experience
// @desc Add profile experience
// @access Private

router.put(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("company", "Company is required")
      .not()
      .isEmpty(),
    check("from", "from date is required")
      .not()
      .isEmpty()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// @router PUT api/profile/education
// @desc Add profile education
// @access Private

router.put(
  "/education",
  passport.authenticate("jwt", { session: false }),
  [
    check("school", "School is required")
      .not()
      .isEmpty(),
    check("fieldofstudy", "Field of study is required")
      .not()
      .isEmpty(),
    check("from", "from date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        res.status(404).send({ msg: "User profile not found" });
      }

      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route GET api/profile
// @des Get all profiles
// @access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route api/profile/user/:user_id
// @desc get user by user id
// @access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found for this user" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json("Sever Errors ^^");
  }
});

module.exports = router;
