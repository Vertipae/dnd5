const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

app.get("/", (req, res) => res.json({ msg: "Welcome to the dnd5 API" }));

// Define routes
app.use("/api/players", require("./routes/players"));
app.use("/api/characters", require("./routes/characters"));
app.use("/api/games", require("./routes/games"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
