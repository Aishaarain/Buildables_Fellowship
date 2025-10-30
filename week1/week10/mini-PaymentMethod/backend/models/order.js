const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    email: { type: String },
    paymentStatus: { type: String, default: "pending" },
    sessionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
