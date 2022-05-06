const express = require('express');
const app = require('./app')
const dotenv = require('dotenv');
const connectDB = require('./db/database');

//config
dotenv.config({
    path:'backend/config/.env'
});

//connect database 
connectDB();

//crete server

const server = app.listen(process.env.PORT ,() => {
    console.log(`server is running on port ${process.env.PORT}`);
})