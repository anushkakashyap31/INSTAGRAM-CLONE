const Post = require("../models/Post");

// Like a post
const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === req.user._id.toString()
    );
    if (alreadyLiked) {
      return res.status(400).json({ message: "Post already liked" });
    }

    post.likes.push(req.user._id);
    await post.save();

    res.json({ likesCount: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to like post" });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const before = post.likes.length;
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );
    if (post.likes.length === before) {
      return res.status(400).json({ message: "Post was not liked" });
    }

    await post.save();

    res.json({ likesCount: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to unlike post" });
  }
};

module.exports = { likePost, unlikePost };
