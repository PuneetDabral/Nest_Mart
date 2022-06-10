const express = require('express');
const app = require('./app')
const dotenv = require('dotenv');
const connectDB = require('./db/database');
const cloudinary = require("cloudinary");

//handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception. App is going down.');
    process.exit(1);
})

//config
dotenv.config({
    path:'backend/config/.env'
});

// console.log(puneet)

//connect database 
connectDB();

// cloudnary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//crete server

const server = app.listen(process.env.PORT ,() => {
    console.log(`server is running on port ${process.env.PORT}`);
})

//unhandle promise rejection
process.on('unhandledRejection',(err,promise) => {
    console.log(`shutting down server for : ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })

})