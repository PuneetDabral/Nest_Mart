const express =  require('express');
const { createUser,loginUser,logoutUser, forgotPassword, resetPassword, userDetails, updatePassword } = require('../controller/UserController');
const {isAuthenticatedUser} = require('../middleware/auth');

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

//user details
router.route('/me').get(isAuthenticatedUser,userDetails)

//update & chnage  passward
router.route('/me/update').put(isAuthenticatedUser,updatePassword)

module.exports = router;