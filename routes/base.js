const express = require('express');

const postController = require("../controllers/base");
const router = express.Router();


router.get("", postController.getBase);  

module.exports = router;