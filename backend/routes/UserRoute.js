const express =  require('express');
const { createUser,loginUser,logoutUser, forgotPassword } = require('../controller/UserController');

const router = express.Router();



//register 
router.route('/registration').post(createUser)

//login 
router.route('/login').post(loginUser)


//logout
router.route('/logout').get(logoutUser)

//forget password
router.route('/password/forgot').post(forgotPassword)

module.exports = router;