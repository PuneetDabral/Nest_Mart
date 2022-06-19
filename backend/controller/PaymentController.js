const catchAsyncErrors = require("../middleware/catchAsyncError");



// const stripe = require("stripe")('sk_test_51KHZtYSDRLLSnc3wFje8mQwke2MnaoVFM6QUikpDVmzZx3NWogxrMGDilVTLLWs8vPKfK9Q3mopOjSrwdi5KLOPd00RooDI9zO');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.Payment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "MERN",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  // res.status(200).json({ stripeApiKey: 'pk_test_51KHZtYSDRLLSnc3wlh28GmgCLAROIkjK5IyxgNAR7SYSLVIr0a4GnOo6HcPVJXsA5dw6ttj3AJulGbqAmZ09IDFu00UjGGORIs' });
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
