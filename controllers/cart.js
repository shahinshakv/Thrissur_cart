const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const ip = require('ip');
const nodemailer = require("nodemailer");



exports.addToCart =  (async (req, res) => {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'dlstest2020@gmail.com', 
        pass:  process.env.App_Mail
    }
});

const mailOptions = {
  from: 'dlstest2020@gmail.com',
  to: 'shahinshasaidu50@gmail.com',
  subject: 'Order Confirmation',
  html: '<h1>Your order has been confirmed!</h1><p>Thank you for your purchase.</p>'
};
  const products = req.body.products;

  const cartProducts = await Promise.all(
    products.map(async productbody => {
        const product = await Product.findOne({_id: productbody.id }).select("product_name packing category_name brand_name description price");
        if(product === null){
            res.status(500).send("Invalid product");
            return;
        }
        let productId = productbody.id;
        let quantity = productbody.quantity;

        const {product_name: productname, packing, category_name: categoryname, brand_name: brandname, description, price} = product;

        return { productId, quantity, productname, categoryname, brandname, packing, description, price };
    })
);
    const  user_id  = req.body.userId;

    
    let username, email, mobile, flat, address, city_name, latitude, longitude, country_name;
    let device = req.body.device;
    let device_id = req.body.device_id;
    let ip_address = ip.address();

    const userId = user_id; //TODO: the logged in user id
    const user = await User.findOne({_id: userId}).then(result => {
            return result;
    });  
 
    if(!user){
      res.status(500).send("Invalid User");
      return;
    }else{
      username = user.name;
     email = user.email;
     mobile = user.mobile;
     flat = user.flat;
     address = user.address;
     city_name = user.city_name;
     latitude = user.latitude;
     longitude = user.longitude;
     country_name = user.country_name
    }
  
    try {
        //no cart for user, create new cart
      let  subTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);
      let  vat = subTotal * 0.05;
      let  grandTotal= subTotal + vat;
        const newCart = await Cart.create({
          userId,
          username,
          email,
          mobile,
          flat,
          address,
          city_name,
          latitude,
          longitude,
          device,
          device_id,
          ip_address,
          products: cartProducts,
          subTotal : subTotal,
          vat : vat,
          grandTotal : grandTotal,
        });
        const order_number = newCart.order_number;
        const response = {order_number, ...newCart._doc}
        switch (response.status) {
          case 0:
            response.status_of_order = "Order is not confirmed";
            break;
          case 1:
            response.status_of_order = "Order is confirmed";
            break;
          case 2:
            response.status_of_order = "Order is picked";
            break;
          case 3:
            response.status_of_order = "Order is delivered";
            break;
          default:
            response.status_of_order = "Order status not found";
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
      });
        return res.status(201).json({
          message: "Order created successfully",
          order: response
          });
      
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  exports.getCart =  (async (req, res) => {
      
    const userId = "63c7b17e9e91774d3840cac0"; //TODO: the logged in user id
    let cart = await Cart.findOne({ userId });

    if(cart){
      const ActiveProducts = await (await Product.find()).filter(item => item.status === 0);;
     // console.log(ActiveProducts);

      
for (let i = 0; i < cart.products.length; i++) {
  for(let j = 0; j < ActiveProducts.length; j++){
  if (cart.products[i].productId === ActiveProducts[j]._id) {
      cart.products.splice(i);
      subTotal = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);
      vat = subTotal * 0.05;
      grandTotal= subTotal + vat;

    cart.subTotal = subTotal;
    cart.vat = vat;
    cart.grandTotal = grandTotal;
    cart = await cart.save();
    return res.status(201).send(cart);
  }
}
}
    }
   });
