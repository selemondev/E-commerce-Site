const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const stripeKey = process.env.STRIPE_KEY;
const stripe = require("stripe")(stripeKey);
router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});
module.exports = router;