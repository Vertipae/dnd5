const express = require("express");
const router = express.Router();

const Player = require("../models/Player");

// @route POST api/players
// @desc Register a player
// @access Public
router.post("/", (req, res) => {
  console.log(req.body);
  const newPlayer = new Player({
    username: req.body.username,
    password: req.body.password
  });
  newPlayer.save();
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
