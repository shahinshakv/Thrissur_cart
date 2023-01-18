const express = require('express');

const postController = require("../controllers/cart");
const router = express.Router();

router.post("",  postController.addToCart);
router.get("", postController.getCart);


module.exports = router;