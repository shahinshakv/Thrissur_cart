const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const { createUser } = require('./user');




exports.addToCart =  (async (req, res) => {

   
    const { productId, quantity } = req.body;

     const [productname, packing, categoryname, brandname, description, price] = await Product.findOne({_id: productId }).then(result => {
    
              return  [result.product_name, result.packing, result.category_name, result.brand_name, result.description, result.price];
    });

    
    if(![productname, packing]){
      res.status(500).send("Invalid product");
      return;
    }
    
    const userId = "63c7b17e9e91774d3840cac0"; //TODO: the logged in user id
    const username = await User.findOne({_id: userId}).then(result => {
            return result.email;
    });  
 
    if(!username){
      res.status(500).send("Invalid User");
      return;
    }
  
    try {
      let cart = await Cart.findOne({ userId });
      console.log(productname)
      let subTotal =0.0;
      let vat = 0.0;
      let grandTotal = 0.0;
      if (cart) {
        //cart exists for user

        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
       
          if(quantity == 0){
            cart.products.splice(itemIndex);
        }else{
          cart.username = username;
          productItem.brandname = brandname;
          productItem.categoryname = categoryname;
          productItem.quantity = quantity;
          productItem.packing = packing;
          productItem.description = description;
          productItem.price = price;
          cart.products[itemIndex] = productItem;
          }
        } else {
          //product does not exists in cart, add new item
          cart.username = username;
          cart.products.push({ productId, quantity, productname, categoryname, brandname, packing, description, price });
        }
       
          subTotal = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);
          vat = subTotal * 0.05;
          grandTotal= subTotal + vat;
    
        cart.subTotal = subTotal;
        cart.vat = vat;
        cart.grandTotal = grandTotal;
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        subTotal = quantity * price;
        vat = subTotal * 0.05;
        grandTotal = subTotal + vat;
        const newCart = await Cart.create({
          userId,
          username,
          products: [{ productId, quantity, productname,categoryname, brandname, packing, description, price }],
          subTotal : subTotal,
          vat : vat,
          grandTotal : grandTotal,
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });