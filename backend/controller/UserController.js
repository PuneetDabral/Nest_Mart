const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require('../utils/jwtToken');

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
  
  sendToken(user, 200, res);
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

  sendToken(user,201,res)
});


//logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null , {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });

})