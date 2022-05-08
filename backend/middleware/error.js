const ErrorHandler = require('../utils/ErrorHandler');



module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "interval server error "
    
    res.status(err.statusCode).json({
        sucess :false,
        message:err.message
    })
}