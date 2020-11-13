const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator")
const Player = require("../models/Player")
const Game = require("../models/Game")
const Character = require("../models/Character")
const ObjectId = require("mongoose").Types.ObjectId
const randToken = require("rand-token")

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
      .sort({
        date: -1,
      })

    games.forEach((game) => {
      // If not the DM of the game, nullify secret to disable players sending invitations
      // console.log(typeof game.dungeonmaster._id)
      // console.log(typeof req.player.id)
      if (game.dungeonmaster._id.toString() !== req.player.id)
        game.secret = null
    })

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
    return res.status(400).json({ errors: errors.mapped() })
  }

  const { name, private } = req.body
  try {
    const newGame = new Game({
      name,
      dungeonmaster: req.player.id,
      private,
      players: [],
      characters: [],
      secret: randToken.generate(32),
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
      return res.status(401).json({ msg: "Access denied" })
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

// @route GET api/games/:id
// @desc Get one game
// @access Private
router.get("/:id/:secret", auth, async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.params.secret)
    const game = await Game.findById(req.params.id)
    // Check if the user is DM of the game or has provided valid secret
    // console.log(req.params.secret)
    // console.log(game.secret)
    if (
      req.params.secret !== game.secret &&
      game.dungeonmaster.toString() !== req.player.id
    ) {
      // If provided secret does not match with the game, return 403 forbidden
      res.status(403).json({ msg: "Access denied" })
    }
    res.send(game)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

// @route POST api/games/join/:id
// @desc Join game
// @access Private
router.post("/join/:id", auth, async (req, res) => {
  await check("character", "Character is required").not().isEmpty().run(req)

  // Get validation result after checks
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  try {
    let game = await Game.findById(req.params.id)
    const character = await Character.findById(req.body.character)
    if (!game || !character) {
      res.status(400).json({ msg: "Game or character not found" })
    }

    const players = [...game.players, new ObjectId(req.player.id)]
    const characters = [...game.characters, new ObjectId(character._id)]

    Game.findByIdAndUpdate(
      game.id,
      { $set: { players, characters } },
      { new: true }
    )

    res.json({ ...game, players, characters })
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Save failed")
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
