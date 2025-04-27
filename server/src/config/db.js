require("dotenv").config();
const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    if (!process.env.DB_URI) {
      console.log("please provide a database url");
      return;
    }
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
};
module.exports = connectToDB;
