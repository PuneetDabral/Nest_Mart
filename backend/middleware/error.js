const ErrorHandler = require('../utils/ErrorHandler');



module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "interval server error "



    //wrong mongodb id error (erorr to fetch product error )
    if(err.name === 'CastError'){
        const message = `Resource not found with id ${err.value}`;
        err = new ErrorHandler(message,404);
    }

    //duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      }

    // Wrong Jwt error user reset password through mail
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again`;
        err = new ErrorHandler(message, 400);
        }


        //Jwt expired error
      if (err.name === "TokenExpiredError") {
        const message = `Your Token is expired please login again`;
        err = new ErrorHandler(message, 400);
        }

    
    res.status(err.statusCode).json({
        sucess :false,
        message:err.message
        // message:err.stack
    })
}

