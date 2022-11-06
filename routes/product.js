const express = require('express');

const postController = require("../controllers/product");
const router = express.Router();
const extractFile = require("../middleware/file");



router.post("", 
extractFile, postController.createProduct);

 router.delete("", postController.deleteProduct);

router.get("", postController.getProducts);  

router.put(
  "",
  extractFile, postController.updateProduct);

// router.get("/:id",postController.getPost );

// router.get("", postController.getPosts);



module.exports = router;
