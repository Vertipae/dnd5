const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Player = require("../models/Player")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

// @route GET api/players/games
// @desc Get all users games
// @access Private (Have to be logged in to see games)
router.get("/games", auth, async (req, res) => {
  try {
    const playersGames = await Player.findById(req.player.id)
      .select("games")
      .populate("games")
    res.send(playersGames)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

// @route GET api/players
// @desc Get all players

// @route POST api/players
// @desc Register a player
// @access Public
router.post("/", async (req, res) => {
  await check("username", "Username is required").not().isEmpty().run(req)
  await check("password", "Please enter a password with 6 or more charaters")
    .isLength({ min: 6 })
    .run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  // console.log(req.body)
  try {
    const player = await Player.findOne({ username: req.body.username })

    if (player) {
      return res.status(400).json({ msg: "User already exists" })
    }

    const newPlayer = new Player({
      username: req.body.username,
      password: req.body.password,
    })

    // const { password } = req.body
    const salt = await bcrypt.genSalt(10)
    newPlayer.password = await bcrypt.hash(newPlayer.password, salt)

    const savedPlayer = await newPlayer.save()

    const payload = {
      savedPlayer: {
        id: savedPlayer.id,
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
    // res.send(savedPlayer)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server error")
  }
})

// @route DELETE api/players/:id
// @desc Delete a player
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let player = await Player.findById(req.params.id)

    if (!player) return res.status(404).json({ msg: "Player not found" })

    // Checking that player owns the account
    if (player.id.toString() !== req.player.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    await Player.findByIdAndRemove(req.params.id)

    res.send({ msg: "Player removed" })
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

module.exports = router
