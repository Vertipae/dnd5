const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "characters",
    },
  ],
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "games",
    },
  ],
  lastLogin: {
    type: String,
  },
})

module.exports = mongoose.model("players", PlayerSchema)
