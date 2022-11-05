const express = require('express');

const postController = require("../controllers/brand");
const router = express.Router();
const extractFile = require("../middleware/file");



router.post("", 
extractFile, postController.createBrand);

 router.delete("", postController.deleteBrand);

router.get("", postController.getBrands);  

router.put(
  "",
  extractFile, postController.updateBrand);

// router.get("/:id",postController.getPost );

// router.get("", postController.getPosts);



module.exports = router;
