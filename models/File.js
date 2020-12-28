const mongoose = require("mongoose")
const fileSchema = new mongoose.Schema({ type: String, data: Buffer })

module.exports = mongoose.model("gameFile", fileSchema)
