const express = require("express");
const { createPost, getAllPosts, getFeed, getPostById } = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getAllPosts);       
router.get("/feed", auth, getFeed);       
router.get("/:postId", auth, getPostById);

module.exports = router;
