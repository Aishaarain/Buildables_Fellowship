require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const paymentRoutes = require("./paymentRoutes");

const app = express();


app.use(cors()); // allow all origins

app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
