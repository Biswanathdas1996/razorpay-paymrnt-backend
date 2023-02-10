require("dotenv").config();

const app = require("express")();
const express = require("express");
const cors = require("cors");

const shortid = require("shortid");
const Razorpay = require("razorpay");

var bodyParser = require("body-parser");

const razorpay = new Razorpay({
  key_id: "rzp_test_awidc9oSR9lH8z",
  key_secret: "rUX7m91S8bxvSYD01O29mctm",
});

app.use(cors());

app.use(express.json());

app.post("/payment", async (req, res) => {
  const payment_capture = 1;
  const amount = req?.query?.price;
  const currency = "INR";
  let item = {};
  // const order_items = req?.body?.map((data) => {
  //   item = {
  //     ...item,
  //     [data?.name]: JSON.stringify({
  //       price: data?.price + "INR",
  //       qty: 1,
  //     }),
  //   };

  //   return {
  //     [data?.name]: {
  //       price: data?.price + "INR",
  //       qty: 1,
  //     },
  //   };
  // });

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: item,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.json({
    server: "connected",
    status: "ok",
  });
});
// app.use()

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log("Backend running at localhost:1337");
});
