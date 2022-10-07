const express = require('express');
const orderController = require('../controllers/order')

const router = express.Router();

router.post('/order', orderController.createOrder);

module.exports = router;