const express = require('express');

const postController = require("../controllers/category");
const router = express.Router();



router.post("", 
  postController.createCategory);

router.get("", postController.getPosts);  

// router.put(
//   "/:id",checkAuth,
//   extractFile, postController.updatePost);

// router.get("/:id",postController.getPost );

// router.get("", postController.getPosts);

// router.delete("/:id",checkAuth, postController.deletePost);


module.exports = router;
