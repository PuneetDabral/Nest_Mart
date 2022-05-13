const express =  require('express');
const { createUser,loginUser,logoutUser } = require('../controller/UserController');

const router = express.Router();



//register 
router.route('/registration').post(createUser)

//login 
router.route('/login').post(loginUser)


//logout
router.route('/logout').get(logoutUser)

module.exports = router;