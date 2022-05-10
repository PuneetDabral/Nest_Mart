const Product = require('../models/ProductModel.js');
const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncError')
const Features = require('../utils/Features')

//create product 
exports.createProduct = catchAsyncErrors(async(req, res,next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })

})

//get app products
exports.getAllProdcuts =catchAsyncErrors(async(req,res)=>{
    const feature = new Features(Product.find(), req.query).search()
    const products = await feature.query;
    res.status(200).json({
        success:true,
        products
    })
  
})

//update product admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product is not found with this id',404)); //error handler
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useUnified :false
    })

    res.status(200).json({
        success:true,
        product
    })

})

//delete product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product is not found with this id',404));

    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:'product is deleted'

    })
})

//get single product details
exports.getSingleProduct =catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);
    
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:'product  is not found with this id'
        // })
        return next(new ErrorHandler('product is not found with this id',404));  //error.js file
    }

    res.status(200).json({
        success:true,
        message:'product is found',
        product     

    })
    
})
