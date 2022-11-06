const Brand = require('../models/brand');
const Category = require('../models/category');
const Product = require('../models/product');

exports.getBase = (req, res, next) => {
    var json = {};
    Category.find(function(err, category) {
      if(err){
        res.status(500).json({
          message: "Fetching category failed"
              });
      }
      json.category = category;
      Brand.find(function (error, brand) {
        if(error){
          res.status(500).json({
            message: "Fetching brand failed"
                });
        }else{
        json.brand = brand;
        }
        console.log(json);
          res.status(200).json({
            message:"Posts fetched successfully!",
            
            category : json.category.map((i)=> {
                i['availability'] = (i.status === 1) ? "available" : "out of stock"
                return i;
              }),
            brands : json.brand.map((i)=> {
        i['availability'] = (i.status === 1) ? "available" : "out of stock"
        return i;
      }),});
        }).lean().sort({"priority": 1});
      }).lean().sort({"priority": 1});
  };