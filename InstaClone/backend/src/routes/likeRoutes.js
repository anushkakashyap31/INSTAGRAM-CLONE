const express = require("express");
const { likePost, unlikePost } = require("../controllers/likeController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId/like", auth, likePost);
router.post("/:postId/unlike", auth, unlikePost);

module.exports = router;
