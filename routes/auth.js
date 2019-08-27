const express = require("express");
const router = express.Router();

// @route POST api/auth
// @desc Get logged in player
// @access Private
router.get("/", (req, res) => {
  res.send("Get logged in player");
});

// @route POST api/auth
// @desc Auth player & get token
// @access Public
router.post("/", (req, res) => {
  res.send("Log in player");
});

module.exports = router;
