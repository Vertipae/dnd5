const express = require("express");
const router = express.Router();

// @route POST api/players
// @desc Register a user
// @access Public
router.post("/", (req, res) => {
  res.send("Register a player");
});

module.exports = router;
