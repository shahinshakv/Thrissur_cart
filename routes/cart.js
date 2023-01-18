const express = require('express');

const postController = require("../controllers/cart");
const router = express.Router();

router.post("",  postController.addToCart);


module.exports = router;