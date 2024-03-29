const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CategoryRoutes = require('./routes/category');
const BrandRoutes = require('./routes/brand');
const BaseRoutes = require('./routes/base');
const ProductRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user');
const countryRoutes = require('./routes/country');
const cityRoutes = require('./routes/city');
const fcmRoutes = require('./routes/fcmtokens');
const app = express();

mongoose.connect("mongodb+srv://shaheen:"+process.env.MONGO_ATLAS_PW+"@cluster0.aghaw.mongodb.net/thrissur_cart")
        .then(()=>{
          console.log("Connected to database");
        })
        .catch(()=>{
          console.log("failed to connect to database");
        });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 app.use("/images", express.static(path.join(__dirname,"images")));
// app.use("/", express.static(path.join(__dirname,"angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/categories",CategoryRoutes);
app.use("/api/brands",BrandRoutes);
app.use("/api/base",BaseRoutes);
app.use("/api/products",ProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/fcmtoken", fcmRoutes);
module.exports = app;

