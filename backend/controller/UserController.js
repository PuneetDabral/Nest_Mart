const User = require('../models/UserModel');
const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncError')

//register user
exports.createUser = catchAsyncErrors(async(req,res,next)=>{
   const {name,email,password} = req.body;

    const user = await User.create({name,
        email,
        password,
        avatar:{
        public_id:"https://testing.com",
        url:"https://testing.com"
    }
});
    res.status(201).json({
        success:true,
        user
        
    })
})