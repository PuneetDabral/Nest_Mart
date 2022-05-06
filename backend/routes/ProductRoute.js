const express = require("express");
const { getAllProdcuts } = require("../controller/ProductController");

const router = express.Router();

router.route('/products').get(getAllProdcuts);


module.exports = router ;