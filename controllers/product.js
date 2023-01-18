const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');


exports.createProduct = (async(req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

   
  const brand_name = await Brand.findOne({_id: req.body.brand_id}).then(result => {
    return  result.brand_name;
});
 const category_name = await Category.findOne({_id: req.body.category_id}).then(result => {
    return result.category_name;
 });

  const product = new Product({
    product_name: req.body.product_name,
    category_id: req.body.category_id,
    category_name: category_name,
    brand_id: req.body.brand_id,
    brand_name: brand_name,
    image: url + "/images/" + req.file.filename,
    packing: req.body.packing,
    price: req.body.price,
    size: req.body.size,
    quantity: req.body.quantity,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status
  });

  

  product.save().then(createdProduct => {
    res.status(201).json({
      message: "Product added successfully",
      products: {
         data: createdProduct,
        id: createdProduct._id
      }
    });
  })
  .catch(error => {
    console.log(error)
      res.status(500).json({
        message: "Creating a product failed"
      });
  });
});


exports.updateProduct = (req, res, next) =>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const product = new Product({
    // _id : req.body.id,
     product_name : req.body.product_name,
     price : req.body.price,
    // category_image: imagePath,
    status : req.body.status
    
  });
   Product.updateOne({_id: req.body.id}, product).then(result => {
    if (result.matchedCount > 0) {

      
      res.status(200).json({message: 'successfully updated'});
    } else {
      res.status(401).json({message: 'Not authorized',});
    }

   }).catch(error => {
    console.log(error)
    res.status(500).json({
      
      message: "Couldn't update the product"
    })
   });
};


exports.getProducts = (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
   const ProductQuery = Product.find();
  // let fetchedPosts;
  // if(pageSize && currentPage){
  //   PostQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  // }

  ProductQuery.find().lean().sort({"priority": 1}).then(documents=> {
        res.status(200).json({
      message: "Products fetched successfully!",
      products: documents.map((i)=> {
        i['availability'] = (i.status === 1) ? "available" : "out of stock"
        return i;
      }),


   //   maxPosts: count
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching products failed",
      error: error
    });
  });
};


// exports.getPost = (req, res, next) =>{
//   Post.findById(req.params.id).then(post => {
//    if(post){
//      res.status(200).json(post);
//    }else{
//      res.status(404).json({message:"Post not found"})
//    }
//   }).catch(error => {
//    res.status(500).json({
//      message: "Fetching posts failed"
//    })});
// };


exports.deleteProduct =  (req, res, next) => {
  console.log("working")
  Product.deleteOne({ _id: req.body.id, status: 1}).then(result => {
    if (result.deletedCount > 0) {
      res.status(200).json({message: 'successfully deleted'});
    } else {
      console.log(result);
      res.status(401).json({message: 'Not authorized'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching product failed"
    })});
};
