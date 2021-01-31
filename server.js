const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const { static } = require("express")
const path = require("path")

const app = express()

app.use(cors())

// Connect Database
connectDB()

// app.use(express.json({ extended: false }));

app.use(express.json({ limit: "50mb", extended: true }))
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
)

// app.get("/", (req, res) => res.json({ msg: "Welcome to the dnd5 API" }))

// Define routes
app.use("/api/players", require("./routes/players"))
app.use("/api/characters", require("./routes/characters"))
app.use("/api/games", require("./routes/games"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api", require("./routes/proxy"))

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
