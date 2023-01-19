const Category = require('../models/category');
const fs = require('fs');
const sharp = require('sharp');

exports.createCategory = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");


  const base64String = req.body.image;
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = base64String.match(regex);
  const ext = matches[1];
  const fileName = 'category--'+Date.now()+`.${ext}`;
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

  const category = new Category({
    category_name: req.body.category_name,
    image: url + "/images/" + fileName,
    priority: req.body.priority,
    status: req.body.status
  });

  category.save().then(createdCategory => {
    res.status(201).json({
      message: "Post added successfully",
      categories: {
         data: createdCategory,
        id: createdCategory._id
      }
    });
  })
  .catch(error => {
      res.status(500).json({
        message: "Creating a category failed"
      });
  });
};


exports.updatePost = (req, res, next) =>{
  let imagePath = req.body.image;
  if(req.body.image){

    const base64String = req.body.image;
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = base64String.match(regex);
  const ext = matches[1];
  const fileName = 'category--'+Date.now()+`.${ext}`;
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
  const post = new Category({
     //_id : req.body.id,
     category_name : req.body.category_name,
    // image: imagePath,
    status : req.body.status
    
  });
   Category.updateOne({_id: req.body.id}, post).then(result => {
    console.log(result)
    if (result.matchedCount > 0) {
      res.status(200).json({message: 'successfully updated'});
    } else {
      res.status(401).json({message: 'Not authorized',});
    }

   }).catch(error => {
    res.status(500).json({
      
      message: "Couldn't update the post"
    })
   });
};


exports.getPosts = (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
   const PostQuery = Category.find();
  // let fetchedPosts;
  // if(pageSize && currentPage){
  //   PostQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  // }

  PostQuery.find().lean().sort({"priority": 1}).then(documents=> {
        res.status(200).json({
      
      message: "Posts fetched successfully!",
      categories: documents.map((i)=> {
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


exports.deletePost =  (req, res, next) => {
  console.log("working")
  Category.deleteOne({ _id: req.body.id, status: 1}).then(result => {
    if (result.deletedCount > 0) {
      res.status(200).json({message: 'successfully deleted'});
    } else {
      console.log(result);
      res.status(401).json({message: 'Not authorized'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching posts failed"
    })});
};
