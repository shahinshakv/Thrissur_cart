const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/category');
//const userRoutes = require('./routes/user');


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
// app.use("/images", express.static(path.join(__dirname,"images")));
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

app.use("/api/posts",postRoutes);

module.exports = app;

