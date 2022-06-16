const express = require('express');
const app = express();
const ErrorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require("path");
// menaing of parse is to parse the body of the request and put it in req.body


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(fileUpload());

//rotes imports
const product = require('./routes/ProductRoute');
const user = require('./routes/UserRoute');
const order = require('./routes/OrderRoute');
const payment = require('./routes/PaymentRoute');




app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);

//anny error accour in any where in app which is not define goes to this error handler
//error handling 
app.use(ErrorHandler);


module.exports = app;