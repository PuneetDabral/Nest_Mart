const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  getAllProdcuts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getSingleProductRivews,
  deleteReview,
} = require("../controller/ProductController");

const router = express.Router();

router.route("/products").get(getAllProdcuts);

router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

router.route("/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/product/:id").get(getSingleProduct);

//for gives rivew 
router.route("/product/review").post(isAuthenticatedUser,createProductReview)

//get single product rivews 
router.route("/reviews").get(getSingleProductRivews);

//review delete admin 
router.route("/reviews").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReview)

module.exports = router;
