const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const { createUser } = require('./user');




exports.addToCart =  (async (req, res) => {

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

    
    
    const userId = user_id; //TODO: the logged in user id
    const username = await User.findOne({_id: userId}).then(result => {
            return result.email;
    });  
 
    if(!username){
      res.status(500).send("Invalid User");
      return;
    }
  
    try {
        //no cart for user, create new cart
      let  subTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);
      let  vat = subTotal * 0.05;
      let  grandTotal= subTotal + vat;
        const newCart = await Cart.create({
          userId,
          username,
          products: cartProducts,
          subTotal : subTotal,
          vat : vat,
          grandTotal : grandTotal,
        });
  
        return res.status(201).send(newCart);
      
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
