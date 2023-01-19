const express = require('express');

const postController = require("../controllers/city");
const router = express.Router();
const extractFile = require("../middleware/file");

router.post("", extractFile, postController.createCity);

router.delete("", postController.deleteCity);

router.get("", postController.getCities);  

router.put(
  "",
  extractFile, postController.updateCity);



module.exports = router;
