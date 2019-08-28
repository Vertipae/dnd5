const express = require("express");
const router = express.Router();

const Player = require("../models/Player");

// @route POST api/players
// @desc Register a player
// @access Public
router.post("/", (req, res) => {
  res.send("Register a player");
});

// @route DELETE api/players
// @desc Register a player
// @access Public
router.delete("/", (req, res) => {
  res.send("Delete a player");
});

// Todo: Find player by email/username Player.findOne

module.exports = router;
