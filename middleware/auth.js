// Checking the token from header when accessing a protected route
// Verifying the token so the player can see own characters

const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token")

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" })
  }

  try {
    const secret =
      process.env.NODE_ENV === "production"
        ? config.util.getEnv("jwtSecret")
        : config.get("jwtSecret")
    const decoded = jwt.verify(token, secret)
    // console.log(decoded)
    req.player = decoded.player
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" })
  }
}
