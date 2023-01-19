const express = require('express');

const postController = require("../controllers/country");
const router = express.Router();
const extractFile = require("../middleware/file");

router.post("", extractFile, postController.createCountry);

router.delete("", postController.deleteCountry);

router.get("", postController.getCountries);  

router.put(
  "",
  extractFile, postController.updateCountry);



module.exports = router;
