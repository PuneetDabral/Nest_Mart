const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[ true,'please enter a name of a product'],
        trim: true,
        maxlength: [20,'name of a product should be less than 20 characters']
    },
    description: {
        type: String,
        required:[ true,'please enter a description of a product'],
        maxlength: [500,'description must be less than 500 characters'],
    },
    price :{
        type: Number,
        required:[ true,'please enter a price of a product'],
        maxlength: [8,'price must be less than 8 characters'],

    },
    discountPrice:{
        type: String,
       maxlength: [4,'discount must be less than 4 characters'],
    }
})