const express = require("express");
const { createOrder, getSingleOrder, getAllOrders, getAdminAllOrders ,updateAdminOrder , deleteOrder } = require("../controller/OrderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//create order
router.route("/order/new").post(isAuthenticatedUser,createOrder)


//get single order 
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder)

//get all order
router.route("/orders/me").get(isAuthenticatedUser,getAllOrders)


//get all order-----admin 
router.route("/orders/admin").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminAllOrders)

//update  admin
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateAdminOrder)
//delte admin
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;

