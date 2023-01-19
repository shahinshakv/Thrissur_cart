const Brand = require('../models/brand');
const fs = require('fs');
const sharp = require('sharp');


exports.createBrand = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

  const base64String = req.body.image;
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = base64String.match(regex);
  const ext = matches[1];
  const fileName = 'brand--'+Date.now()+`.${ext}`;
  const filepath = `images/${fileName}`;
  const imageBuffer = Buffer.from(matches[2], 'base64');
  sharp(imageBuffer)
  .resize(500, 500) // resize to 300x300 pixels
  .toFile(filepath, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Image resized and saved successfully!');
    }
  });
  // fs.writeFileSync(filepath, imageBuffer);
 



  const brand = new Brand({
    brand_name: req.body.brand_name,
    image: url + "/images/" + fileName,
    category_id: req.body.category_id,
    priority: req.body.priority,
    status: req.body.status
  });

  brand.save().then(createdBrand => {
    res.status(201).json({
      message: "Brand added successfully",
      brands: {
         data: createdBrand,
        id: createdBrand._id
      }
    });
  })
  .catch(error => {
    console.log(error)
      res.status(500).json({
        message: "Creating a brand failed"
      });
  });
};


exports.updateBrand = (req, res, next) =>{
  let imagePath = req.body.image;

  if(req.body.image){

    const base64String = req.body.image;
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = base64String.match(regex);
  const ext = matches[1];
  const fileName = 'brand--'+Date.now()+`.${ext}`;
  const filepath = `images/${fileName}`;
  const imageBuffer = Buffer.from(matches[2], 'base64');
  sharp(imageBuffer)
  .resize(500, 500) // resize to 300x300 pixels
  .toFile(filepath, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Image resized and saved successfully!');
    }
  });

  //fs.writeFileSync(filepath, imageBuffer);

    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + fileName;
  }
  const brand = new Brand({
    // _id : req.body.id,
     brand_name : req.body.brand_name,
    // image: imagePath,
    status : req.body.status
    
  });
   Brand.updateOne({_id: req.body.id}, brand).then(result => {
    if (result.matchedCount > 0) {

      
      res.status(200).json({message: 'successfully updated'});
    } else {
      res.status(401).json({message: 'Not authorized',});
    }

   }).catch(error => {
    console.log(error)
    res.status(500).json({
      
      message: "Couldn't update the brand"
    })
   });
};


exports.getBrands = (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
   const BrandQuery = Brand.find();
  // let fetchedPosts;
  // if(pageSize && currentPage){
  //   PostQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  // }

  BrandQuery.find().lean().sort({"priority": 1}).then(documents=> {
        res.status(200).json({
      message: "Brands fetched successfully!",
      brands: documents.map((i)=> {
        i['availability'] = (i.status === 1) ? "available" : "out of stock"
        return i;
      }),


   //   maxPosts: count
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching posts failed",
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


exports.deleteBrand =  (req, res, next) => {
  console.log("working")
  Brand.deleteOne({ _id: req.body.id, status: 1}).then(result => {
    if (result.deletedCount > 0) {
      res.status(200).json({message: 'successfully deleted'});
    } else {
      console.log(result);
      res.status(401).json({message: 'Not authorized'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching brands failed"
    })});
};
