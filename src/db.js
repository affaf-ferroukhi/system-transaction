const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/system-transaction");
    console.log("MongoDB Atlas Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Quitter si échec
  }
};

module.exports = connectDB;
