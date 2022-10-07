const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');
const user = require('../models/user');

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage("email should be in a correct format")
        .custom((value, { req }) => {
            return user.findOne({ email: value }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject('E-mail address already exists');
                }
            });
        })
        .normalizeEmail(),
        body('password')
        .trim()
        .isLength({min: 5}).withMessage("password should be at least 5 characters"),
        body('name')
        .trim()
        .not()
        .isEmpty().withMessage("name cannot be empty.")
], authController.signup);

router.post('/login', authController.login);

module.exports = router;