import mongoose from "mongoose";

// localhost MongoDB database
const mongoUrl = "mongodb://localhost:27017/GraphQLProject";

// connect to MongoDB
mongoose.connect(mongoUrl, {
  // optional settings if needed
});

// get the connection
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
export default db;
