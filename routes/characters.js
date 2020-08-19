const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator")
const Player = require("../models/Player")
const Character = require("../models/Character")

// @route GET api/characters
// @desc Get all players characters
// @access Private (Have to be logged in to see characters)
router.get("/", auth, async (req, res) => {
  // res.send("Get all characters");
  // Character.find().then((characters) => res.send(characters))
  try {
    // Todo sort .sort({date: -1})
    const characters = await Character.find({ player: req.player.id })
    res.json(characters)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route POST api/characters
// @desc Add new character
// @access Private
router.post("/", auth, async (req, res) => {
  const { name, race, level } = req.body

  const newCharacter = new Character({
    name,
    race,
    class: req.body.class,
    level,
    player: req.player.id,
  })
  const character = await newCharacter.save()
  res.send(character)
})

// @route PUT api/characters/:id
// @desc Update character
// @access Private
router.put("/:id", (req, res) => {
  res.send("Update character")
})

// @route DELETE api/characters/:id
// @desc Delete character
// @access Private
router.delete("/:id", (req, res) => {
  res.send("Delete character")
})

module.exports = router
