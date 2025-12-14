const Post = require("../models/Post");
const User = require("../models/User");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { image, caption } = req.body;

    if (!image || !caption) {
      return res.status(400).json({ message: "Image and caption are required" });
    }

    const post = await Post.create({
      image,
      caption,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Get all posts (optional)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Get feed: posts from followed users
const getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      author: { $in: user.following },
    })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feed" });
  }
};

// Get single post with basic info
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author", "username")
      .populate("likes", "username");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

module.exports = { createPost, getAllPosts, getFeed, getPostById };
