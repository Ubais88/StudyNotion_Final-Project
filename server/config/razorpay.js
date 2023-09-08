const Razorpay = require("razorpay");

exports.instance = new Razorpay({
    key_id:process.env.RAZOYPAY_KEY,
    key_secret:process.env.RAZARPAY_SECRET,
})