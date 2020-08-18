const express = require("express")
const router = express.Router()

const Player = require("../models/Player")

// const { check, validationResult } = require("express-validator")

// @route GET api/auth
// @desc Get logged in player
// @access Private
router.get("/", (req, res) => {
  res.send("Get logged in player")
})

// @route POST api/auth/login
// @desc Auth player & get token
// @access Public
router.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  Player.findOne({ username, password }).then((player) => {
    console.log(player)
    if (!player) {
      return res.status(400).json({ msg: "Ei onnistu" })
    } else {
      res.send(player)
      console.log("Success")
    }
  })
})

module.exports = router
