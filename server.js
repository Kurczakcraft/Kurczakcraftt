
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.post("/create-checkout-session", async (req, res) => {
  const { rank } = req.body;
  const prices = { vip: 1000, svip: 2500, gvip: 5000 };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: { name: `Ranga ${rank.toUpperCase()}` },
          unit_amount: prices[rank],
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://kurczakcraft.pl/success",
    cancel_url: "https://kurczakcraft.pl/cancel",
  });
  res.json({ url: session.url });
});

app.listen(3000, () => console.log("Server działa na http://localhost:3000"));
