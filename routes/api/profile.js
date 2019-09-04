const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

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
  async (req, res) => {
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
  async (req, res) => {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      status
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

module.exports = router;
