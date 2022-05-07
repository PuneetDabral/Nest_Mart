const express = require("express");
const { getAllProdcuts, createProduct, updateProduct } = require("../controller/ProductController");

const router = express.Router();

router.route('/products').get(getAllProdcuts);


router.route('/product/new').post(createProduct);

router.route('/product/:id').put(updateProduct);




module.exports = router ;