const express = require("express");
const router = express.Router();

const Player = require("../models/Player");

// @route GET api/auth
// @desc Get logged in player
// @access Private
router.get("/", (req, res) => {
  res.send("Get logged in player");
});

// @route POST api/auth/login
// @desc Auth player & get token
// @access Public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Player.findOne({ username }).then(player => {
    if (!player) {
      errors.username = "Wrong username or password";
      return res.status(404).json(errors);
    } else {
      res.send(Player);
      console.log("Success");
    }
  });
});

module.exports = router;
