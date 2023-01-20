const express = require('express');

const postController = require("../controllers/fcmtokens");
const router = express.Router();


router.post("", postController.createFCM);  

router.post("/send", postController.sendPushNotification);

module.exports = router;