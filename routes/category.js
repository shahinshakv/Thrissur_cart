const express = require('express');

const postController = require("../controllers/category");
const router = express.Router();
const extractFile = require("../middleware/file");



router.post("", 
extractFile, postController.createCategory);

 router.delete("", postController.deletePost);

router.get("", postController.getPosts);  

// router.put(
//   "/:id",checkAuth,
//   extractFile, postController.updatePost);

// router.get("/:id",postController.getPost );

// router.get("", postController.getPosts);



module.exports = router;
