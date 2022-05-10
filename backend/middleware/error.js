const ErrorHandler = require('../utils/ErrorHandler');



module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "interval server error "



    //wrong mongodb id error (erorr to fetch product error )
    if(err.name === 'CastError'){
        const message = `Resource not found with id ${err.value}`;
        err = new ErrorHandler(message,404);
    }

    
    res.status(err.statusCode).json({
        sucess :false,
        message:err.message
    })
}