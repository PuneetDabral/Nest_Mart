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

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();


    const feature = new Features(Product.find(), req.query)
    .search()
    .filter()    //search  and filter is a product cantroller
    .pagination(resultPerPage)
    const products = await feature.query;
    res.status(200).json({
        success:true,
        products,
        resultPerPage
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
        product,
        productCount     

    })    
})

//create Review and update Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;  //0+4=4 //0+3=3 =7
  
    });
  
    product.ratings = avg / product.reviews.length;  //7/2
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

  //get all reviews for single product 
  
  
  