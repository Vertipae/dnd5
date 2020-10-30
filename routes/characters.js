const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator")
const Character = require("../models/Character")

// @route GET api/characters
// @desc Get all players characters
// @access Private (Have to be logged in to see characters)
router.get("/", auth, async (req, res) => {
  // res.send("Get all characters");
  // Character.find().then((characters) => res.send(characters))
  try {
    const characters = await Character.find({ player: req.player.id }).sort({
      date: -1,
    })
    res.json(characters)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

// @route GET api/characters/:id
// @desc Get one player character
// @access Private (Have to be logged in to see character)
router.get("/:id", auth, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
    res.json(character)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

// @route POST api/characters
// @desc Add new character
// @access Private
router.post("/", auth, async (req, res) => {
  await check("name", "Name is required").not().isEmpty().run(req)
  await check("race", "Race is required").not().isEmpty().run(req)
  await check("characterClass", "Class is required").not().isEmpty().run(req)
  await check("level", "Level is required").not().isEmpty().run(req)

  // Get validation result after checks
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }
  const { name, race, characterClass, level, alignment } = req.body
  try {
    const newCharacter = new Character({
      name,
      race,
      characterClass,
      level,
      alignment,
      player: req.player.id,
    })
    const character = await newCharacter.save()
    res.send(character)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Save failed")
  }
})

// @route PUT api/characters/:id
// @desc Update character
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { name, race, characterClass, level, alignment } = req.body

// Checking that if these fields exist so they can be updated
  const characterFields = {}
  if (name) characterFields.name = name
  if (race) characterFields.race = race
  if (characterClass) characterFields.characterClass = characterClass
  if (level) characterFields.level = level
  if (alignment) characterFields.alignment = alignment

  try {
    let character = await Character.findById(req.params.id)

    if (!character) return res.status(404).json({ msg: "Character not found" })

    // Checking that player owns character
    if (character.player.toString() !== req.player.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    character = await Character.findByIdAndUpdate(
      req.params.id,
      { $set: characterFields },
      { new: true }
    )

    res.send(character)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

// @route DELETE api/characters/:id
// @desc Delete character
// @access Private
// TODO: Delete the character from the games & player
router.delete("/:id", auth, async (req, res) => {
  try {
    let character = await Character.findById(req.params.id)

    if (!character) return res.status(404).json({ msg: "Character not found" })

    // Checking that player owns character
    if (character.player.toString() !== req.player.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    await Character.findByIdAndRemove(req.params.id)

    // res.send({ msg: "Character removed" })
    res.send(character)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

module.exports = router
