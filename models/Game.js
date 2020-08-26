const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dungeonmaster: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "players",
  },
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "characters",
    },
  ],
  private: {
    type: Boolean,
    default: false,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "players",
    },
  ],
})

module.exports = mongoose.model("games", GameSchema)
