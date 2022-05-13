const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//register user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "https://testing.com",
      url: "https://testing.com",
    },
  });
  const token = user.getSignedJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});

//login

exports.loginUser = catchAsyncErrors(async (req, res,next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("User not found with this email & password", 401)
    );
  }

  //function to check hash
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(
      new ErrorHandler("User not found with this email & password", 401)
    );
  }

  const token = user.getSignedJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});
