const Product = require('../models/ProductModel.js');

//create product 
exports.createProduct = async(req, res,next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })

}

//create product 
exports.getAllProdcuts =async(req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
  
}

//update product admin
exports.updateProduct = async(req,res)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:'product  is not found with this id'
        })
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


}