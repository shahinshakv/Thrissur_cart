const express = require('express');

const basketController = require("../controllers/basket");
const router = express.Router();
const extractFile = require("../middleware/file");



router.post("", 
extractFile, basketController.createBasket);

router.get("", basketController.getBasket);  


module.exports = router;
