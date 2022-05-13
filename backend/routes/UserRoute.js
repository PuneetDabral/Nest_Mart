const express =  require('express');
const { createUser,loginUser } = require('../controller/UserController');

const router = express.Router();



//register 
router.route('/registration').post(createUser)

//login 
router.route('/login').post(loginUser)


module.exports = router;