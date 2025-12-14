const express = require("express");
const { addComment, getComments } = require("../controllers/commentController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId", auth, addComment);
router.get("/:postId", auth, getComments);

module.exports = router;
