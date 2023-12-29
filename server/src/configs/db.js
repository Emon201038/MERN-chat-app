const mongoose = require("mongoose");
const { dbUrl } = require("../../secret.js");

const db = async () => {
  try {
    // mongoose.set("debug", true);
    mongoose
      .connect(dbUrl)
      .then(() => console.log(`MongoDB connection established successfully`));
    mongoose.connection.on("error", (err) =>
      console.log("Database connection error", err)
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = db;
