const express = require('express');
const userController = require('../controllers/user')
const productController = require('../controllers/product')

const router = express.Router();

router.post('/user', userController.createUser);
router.post('/product', productController.createProduct);

module.exports = router;