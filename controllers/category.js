const Category = require('../models/category');


exports.createCategory = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const category = new Category({
    category_name: req.body.category_name,
    category_image: url + "/images/" + req.file.filename,
    priority: req.body.priority,
  

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


// exports.updatePost = (req, res, next) =>{
//   let imagePath = req.body.imagePath;
//   if(req.file){
//     const url = req.protocol + '://' + req.get("host");
//     imagePath = url + "/images/" + req.file.filename;
//   }
//   const post = new Post({
//      _id : req.body.id,
//      title : req.body.title,
//      content : req.body.content,
//      imagePath: imagePath,
//      creator : req.userData.userId
//   });
//    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
//     if (result.matchedCount > 0) {
//       res.status(200).json({message: 'successfully updated'});
//     } else {
//       res.status(401).json({message: 'Not authorized'});
//     }

//    }).catch(error => {
//     res.status(500).json({
//       message: "Couldn't update the post"
//     })
//    });
// };


exports.getPosts = (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
   const PostQuery = Category.find();
  // let fetchedPosts;
  // if(pageSize && currentPage){
  //   PostQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  // }
  PostQuery.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      categories: documents
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
  Category.deleteOne({ _id: req.params.id}).then(result => {
    if (result.deletedCount > 0) {
      res.status(200).json({message: 'successfully deleted'});
    } else {
      res.status(401).json({message: 'Not authorized'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching posts failed"
    })});
};
