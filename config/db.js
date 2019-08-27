// Connect database

const mongoose = require("mongoose");
const config = require("config");
// from default.json value mongoURI
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      // avoiding warnings
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
      console.log(err.message);
      // exit with failure
      process.exit(1);
    });
};

module.exports = connectDB;
