const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check, validationResult } = require("express-validator/check");
const Auth = require("../../middleware/auth");
// Load profile model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// @route GET api/profile
// @des test route

// @access Public

router.get("/test", (req, res) => res.send("profile Route"));
// @routes GET api/profile/me
// @desc Get current user profile
// @access private

router.get(
  "/me",
  // passport.authenticate("jwt", { session: false }),
  Auth,
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
  // passport.authenticate("jwt", { session: false }),
  Auth,
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
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        const profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profile);
      } else {
        //check if handle is exist or not
        const existHandle = await Profile.findOne({
          handle: profileFields.handle
        });
        if (existHandle) {
          return res
            .status(404)
            .json({ errors: [{ msg: "The handle already exists" }] });
        }
        const profile = new Profile(profileFields);
        profile.save();
        res.json(profile);
      }

      // if(profileFields.handle){
      //   const profile = await Profile.findOne
      // }

      // let profile = await Profile.findOneAndUpdate(
      //   { user: req.user.id },
      //   { $set: profileFields },
      //   { new: true, upsert: true }
      // );
      // res.json(profile);
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
  // passport.authenticate("jwt", { session: false }),
  Auth,
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
  // passport.authenticate("jwt", { session: false }),
  Auth,
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
      description,
      location
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      location
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

router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("user", ["name", "avatar"]);
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

// @router api/experience/:exp_id
// @des delete experience by id
// private
router.delete(
  "/experience/:exp_id",
  // passport.authenticate("jwt", { session: false }),
  Auth,
  async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      const expIds = foundProfile.experience.map(exp => exp._id.toString());
      const removeIndex = expIds.indexOf(req.params.exp_id);
      if (removeIndex === -1) {
        res.status(500).json({ msg: "Sever Errors" });
      }

      foundProfile.experience.splice(removeIndex, 1);
      await foundProfile.save();

      res.json(foundProfile);
    } catch (error) {}
  }
);

// @router api/profile/education/:edu_id
// @desc delete education by id
// @ Private

router.delete(
  "/education/:edu_id",
  // passport.authenticate("jwt", { session: false }),
  Auth,
  async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });

      const eduIds = foundProfile.education.map(edu => edu._id.toString());

      const removeIndex = eduIds.indexOf(req.params.edu_id);

      if (removeIndex === -1) {
        return res.status(500).send("Server Error");
      }

      foundProfile.education.splice(removeIndex, 1);

      await foundProfile.save();
      res.json(foundProfile);
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route DELETE api/profile
// @des Delete profile ,user, & posts
// @access Private

router.delete(
  "/",
  // passport.authenticate("jwt", { session: false }),
  Auth,
  async (req, res) => {
    try {
      // Remove user posts
      // await Post.deleteMany({ user: req.user.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
      res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

router.get("/handle/:handle_name", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle_name
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    return res.status(5000).json({ msg: "Server errors" });
  }
});

module.exports = router;
