const express = require("express");

const feedController = require('../controllers/feed');
const {authorize} = require('../middleware/is-auth');

const router = express.Router();

router.get('/posts', authorize(), feedController.getPosts);
router.post('/post', feedController.createPost);
router.get('/post/:postId', feedController.getPost);
router.put('/post/:postId', feedController.updatePost);
router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
