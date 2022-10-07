const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({ posts: [{ title: 'First Post', content: 'This is the first post.' }] });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content
  });

  post.save()
    .then((result) => {
      res.status(201).json({
        message: "a post created successfully",
        post: result
      });
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      res.status(200).json({ message: 'Post Fetched.', post: post });
    })
    .catch(err => console.log(err));
}

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const content = req.body.content;
  const title = req.body.title;

  Post.findById(postId)
    .then((post) => {
      post.content = content;
      post.title = title;
      return post.save()
    })
    .then((post) => {
      res.status(200).json({ message: "post updated successfully.", post: post });
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
  .then((post) => {
    if (!post) {
      const error = new Error("could not find post.");
      error.statusCode = 404;
      throw error;
    }

    return Post.findByIdAndRemove(postId);
  })
  .then(result => {
    console.log(result);
    res.status(200).json({message: 'Deleted post.'});
  })
  .catch((err) => {
    console.log(err);
  })
  
}