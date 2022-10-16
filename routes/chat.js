const express = require("express");

const chatController = require('../controllers/chat');

const router = express.Router();

router.post('/message', chatController.createMessage);


module.exports = router;