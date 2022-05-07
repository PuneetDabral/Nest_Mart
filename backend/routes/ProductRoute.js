const express = require("express");
const {
  getAllProdcuts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/ProductController");

const router = express.Router();

router.route("/products").get(getAllProdcuts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct);

router.route("/product/:id").delete(deleteProduct);

router.route("/product/:id").get(getSingleProduct);

module.exports = router;
