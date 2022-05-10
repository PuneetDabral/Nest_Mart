const express = require('express');
const app = express();
const ErrorHandler = require('./middleware/error');
app.use(express.json());

//rotes imports
const product = require('./routes/ProductRoute');
const user = require('./routes/UserRoute');


app.use('/api/v1',product);
app.use('/api/v1',user);

app.use(ErrorHandler);


module.exports = app;