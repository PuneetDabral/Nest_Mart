const express = require('express');
const app = express();
const ErrorHandler = require('./middleware/error');
app.use(express.json());

//rotes imports
const product = require('./routes/ProductRoute');

app.use('/api/v1',product);

app.use(ErrorHandler);


module.exports = app;