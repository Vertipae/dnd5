const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dungeonmaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "players"
  },
  players: [
    {
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "players"
      },
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "characters"
      }
    }
  ]
});

module.exports = mongoose.model("games", GameSchema);
