const express =  require('express');
const { createUser,loginUser,logoutUser, forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } 
= require('../controller/UserController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const router = express.Router();



//register 
router.route('/registration').post(createUser)

//login 
router.route('/login').post(loginUser)


//logout
router.route('/logout').get(logoutUser)

//forget password
router.route('/password/forgot').post(forgotPassword)

//reset password
router.route('/password/reset/:token').put(resetPassword)

// ---------------------------------------------------------------------------------
//user details
router.route('/me').get(isAuthenticatedUser,userDetails)

//update & chnage  passward
router.route('/me/update').put(isAuthenticatedUser,updatePassword)


//update updateProfile
router.route('/me/update/info').put(isAuthenticatedUser,updateProfile)


// -------------------------------------------------------
// admin 
//get all userS
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)

//single user
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)

//chnage role
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)

//delete user
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)

module.exports = router;