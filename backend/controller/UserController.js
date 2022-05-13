const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require('../utils/jwtToken');
const sendMail = require('../utils/sendMail.js')

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


//forgot password 
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user){
    return next(new ErrorHandler("User not found with this email", 404));
  }

  //get passwordreset token 
  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });
//req.protocal = http
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `your password reset token is: \n\n ${resetPasswordUrl}`;

  try{
    await sendMail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message
    })

    res.status(200).json({
      sucesss:true,
      message : `Email send to ${user.email} succesfull`
    })
  }catch(err){
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;
    await user.save({
      validateBeforeSave: false,

    })

    return next(new ErrorHandler(err.message));

  }
})