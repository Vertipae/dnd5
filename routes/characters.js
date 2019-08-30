const express = require("express");
const router = express.Router();

const Character = require("../models/Character");

// @route GET api/characters
// @desc Get all players characters
// @access Private (Have to be logged in to see characters)
router.get("/", (req, res) => {
  // res.send("Get all characters");
  Character.find().then(characters => res.send(characters));
});

// @route POST api/characters
// @desc Add new character
// @access Private
router.post("/", (req, res) => {
  const newCharacter = new Character({
    name: req.body.name,
    race: req.body.race,
    class: req.body.class,
    level: req.body.level
    // owner
  });
  newCharacter.save();
  res.send("Add character");
});

// @route PUT api/characters/:id
// @desc Update character
// @access Private
router.put("/:id", (req, res) => {
  res.send("Update character");
});

// @route DELETE api/characters/:id
// @desc Delete character
// @access Private
router.delete("/:id", (req, res) => {
  res.send("Delete character");
});

module.exports = router;
