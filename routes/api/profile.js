const express = require("express");
const router = express.Router();

// @route GET api/users
// @des test route

// @access Public

router.get("/", (req, res) => res.send("profile Route"));

module.exports = router;
