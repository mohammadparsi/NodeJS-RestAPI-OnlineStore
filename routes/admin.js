const express = require('express');
const userController = require('../controllers/user')
const productController = require('../controllers/product')
const {authorize} = require('../middleware/is-auth')
const Role = require('../enums/role')

const router = express.Router();

router.post('/user', userController.createUser);
router.post('/product', authorize([Role.Admin]), productController.createProduct);

module.exports = router;