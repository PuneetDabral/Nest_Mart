const ErrorHandler = require("../utils/ErrorHandler");

const catchAsyncErrors = require("./catchAsyncError");

const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to acess this resources", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodeData.id);

  next();
});


//admin roles
// ... means object spread operator
exports.authorizeRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){ // if jo hmaara role h vo admin ne h to yai error passs kro(req.user.role)(true but we need false )
        // console.log(req.user.role);
            return next(new ErrorHandler(`${req.user.role} can not acess this resources`));
        }
        //if roll is not user then run next
        next();
    }

}
