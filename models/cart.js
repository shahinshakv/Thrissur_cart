const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: Number,
    username: String,
    products: [
      {
        productId: Number,
        quantity: Number,
        productname:String,
        categoryname: String,
        brandname: String, 
        packing: String,
        image: String,
        description: String,
        price: Number
      }
    ],
    subTotal: Number,
    vat: Number, 
    grandTotal: Number,
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);