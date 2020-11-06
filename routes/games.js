const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator")
const Player = require("../models/Player")
const Game = require("../models/Game")
const ObjectId = require("mongoose").Types.ObjectId

// @route GET api/games
// @desc Get all users games
// @access Private (Have to be logged in to see games)
// Player can choose that if the game is private or not
router.get("/", auth, async (req, res) => {
  try {
    const games = await Game.find({
      private: false,
      $or: [
        { dungeonmaster: new ObjectId(req.player.id) },
        { players: { $in: [new ObjectId(req.player.id)] } },
      ],
    })
      .populate("characters")
      .populate("players", "-password")
      .populate("dungeonmaster", "-password")

    console.log(games)
    res.send(games)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

// @route POST api/games
// @desc Add new game
// @access Private
router.post("/", auth, async (req, res) => {
  await check("name", "Name is required").not().isEmpty().run(req)

  // Get validation result after checks
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, private } = req.body
  try {
    const newGame = new Game({
      name,
      dungeonmaster: req.player.id,
      private,
      players: [],
      characters: [],
    })
    const game = await newGame.save()
    res.send(game)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Save failed")
  }
})

// @route PUT api/games/:id
// @desc Update game
// @access Private
router.put("/:id", auth, async (req, res) => {
  await check("name", "Name is required").not().isEmpty().run(req)

  // Get validation result after checks
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, private, players, characters } = req.body

  const gameFields = {}
  if (name) gameFields.name = name
  if (private) gameFields.private = private
  if (players) gameFields.players = players
  if (characters) gameFields.characters = characters

  try {
    let game = await Game.findById(req.params.id)

    if (!game) return res.status(404).json({ msg: "Game not found" })

    // Checking that player owns the game
    if (game.dungeonmaster.toString() !== req.player.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    game = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: gameFields },
      { new: true }
    )
    res.send(game)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

// @route DELETE api/games/:id
// @desc Delete game
// @access Private
// TODO: Failsave
router.delete("/:id", auth, async (req, res) => {
  try {
    let game = await Game.findById(req.params.id)

    if (!game) return res.status(404).json({ msg: "Game not found" })

    // Checking that player owns the game
    if (game.dungeonmaster.toString() !== req.player.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    let players = await Player.find({ _id: { $in: game.players } })
    // console.log(players)

    // Deletes game from players
    players.forEach(async (player) => {
      player.games = player.games.filter((game) => game === req.params.id)
      // console.log(player)
      await player.save()
    })
    await Game.findByIdAndRemove(req.params.id)

    res.send({ msg: "Game removed" })
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

module.exports = router
