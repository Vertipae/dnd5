const config = require("config")

if (process.env.NODE_ENV === "production") {
  require("dotenv").config()
}
// console.log(process.env)
const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : config.get("mongoURI")
const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : config.get("jwtSecret")

module.exports = {
  MONGO_URI,
  JWT_SECRET,
}
