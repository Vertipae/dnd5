const express = require("express")
const router = express.Router()

const Player = require("../models/Player")
const jwt = require("jsonwebtoken")
const config = require("config")
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

// const { check, validationResult } = require("express-validator")

// @route GET api/auth
// @desc Get logged in player
// @access Private
// Validates the logged in user
router.get("/", auth, async (req, res) => {
  try {
    //.select('-password) so it won't return password
    const user = await Player.findById(req.player.id).select("-password")
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
  // res.send("Get logged in player")
})

// @route POST api/auth/login
// @desc Auth player & get token
// @access Public
router.post("/login", async (req, res) => {
  await check("username", "Username is required").not().isEmpty().run(req)
  await check("password", "Password is required").exists().run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  // const username = req.body.username
  // const password = req.body.password

  const { username, password } = req.body

  try {
    const player = await Player.findOne({ username })

    if (!player) {
      return res
        .status(400)
        .json({ errors: { username: { msg: "Invalid Credentials" } } })
    }

    const isMatch = await bcrypt.compare(password, player.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: { username: { msg: "Invalid Credentials" } } })
    }

    const payload = {
      player: {
        id: player.id,
        username: player.username
      },
    }

    // Adding token & response with Json Web Token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
        // Callback that returns token and throws possible errors
      },
      (err, token) => {
        if (err) throw err
        res.send({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
