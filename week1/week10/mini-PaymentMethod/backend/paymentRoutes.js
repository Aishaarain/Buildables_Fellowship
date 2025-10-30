require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Order = require("./models/order");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Mastery" }],
]);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("Received items:", req.body.items);
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const line_items = req.body.items.map((item) => {
      const storeItem = storeItems.get(Number(item.id)); // ensure number
      if (!storeItem) throw new Error(`Invalid item ID: ${item.id}`);
      return {
        price_data: {
          currency: "usd",
          product_data: { name: storeItem.name },
          unit_amount: storeItem.priceInCents,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // Save the order to the database
    const firstItem = storeItems.get(Number(req.body.items[0].id));
    await Order.create({
      courseName: firstItem.name,
      price: firstItem.priceInCents / 100,
      quantity: req.body.items[0].quantity,
      sessionId: session.id,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Stripe checkout error:", e);
    res.status(500).json({ error: e.message });
  }
});

// Get checkout session info (for Success page)
router.get("/checkout-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Session ID required" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json(session);
  } catch (err) {
    console.error("Error fetching session:", err);
    res.status(500).json({ error: err.message });
  }
});

// Stripe webhook (optional: verify payment success)
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  console.log("Webhook received");
  try {
    const event = req.body;
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await Order.findOneAndUpdate({ sessionId: session.id }, { paymentStatus: "paid" });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
