const mongoose = require("mongoose");

// localhost MongoDB database
const mongoUrl = "mongodb://localhost:27017/admin";

// connect to MongoDB
mongoose.connect(mongoUrl, {
 
});

const db = mongoose.connection;

// event listeners
db.on("connected", () => {
  console.log(" MongoDB server connected");
});

db.on("error", (err) => {
  console.error(" MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log(" MongoDB server disconnected");
});

// export database connection
module.exports = db;
