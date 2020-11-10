const mongoose = require("mongoose")

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  race: {
    type: String,
    required: true,
  },
  characterClass: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  alignment: {
    type: String,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "players",
    required: true,
  },
})

module.exports = mongoose.model("characters", CharacterSchema)
