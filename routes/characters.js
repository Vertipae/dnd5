const express = require("express");
const router = express.Router();

// @route GET api/characters
// @desc Get all players characters
// @access Private (Have to be logged in to see characters)
router.get("/", (req, res) => {
  res.send("Get all characters");
});

// @route POST api/characters
// @desc Add new character
// @access Private
router.post("/", (req, res) => {
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
