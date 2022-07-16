require("dotenv").config();

const app = require("express")();

const cors = require("cors");

const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_awidc9oSR9lH8z",
  key_secret: "rUX7m91S8bxvSYD01O29mctm",
});

app.use(cors());

app.post("/payment", async (req, res) => {
  const payment_capture = 1;
  const amount = req?.query?.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
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

app.listen(1337, () => {
  console.log("Backend running at localhost:1337");
});
