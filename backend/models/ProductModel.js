const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name of a product"],
    trim: true,
    maxlength: [20, "name of a product should be less than 20 characters"],
  },
  description: {
    type: String,
    required: [true, "please enter a description of a product"],
    maxlength: [500, "description must be less than 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "please enter a price of a product"],
    maxlength: [8, "price must be less than 8 characters"],
  },
  discountPrice: {
    type: String,
    maxlength: [4, "discount must be less than 4 characters"],
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter a category of a product"],
  },
  Stock: {
    type: Number,
    required: [true, "please enter a stock of a product"],
    maxlength: [4, "stock must be less than 4 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  user:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
  //   required: true
},
createAt:{
    type:Date,
    default: Date.now()
}


});

module.exports = mongoose.model("Product", productSchema);