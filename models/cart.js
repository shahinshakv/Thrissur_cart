const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const CartSchema = new mongoose.Schema(
  {
    order_number: Number,
    userId: Number,
    username: String,
    email: String,
    mobile: Number,
    flat : String,
    address: String,
    city_name: String,
    latitude: String,
    longitude: String,
    country_name: String,
    device: String,
    device_id: String,
    ip_address: String,
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
    payment_mode: {type: String, default: "CASH"},
    payment_reference: {type: String, default: "Cash on delivery"},
    status: {type: Number, default: 0},
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
CartSchema.plugin(AutoIncrement,{start_seq: 12000, id: 'cart_id', inc_field: 'order_number'});

module.exports = mongoose.model("Cart", CartSchema);