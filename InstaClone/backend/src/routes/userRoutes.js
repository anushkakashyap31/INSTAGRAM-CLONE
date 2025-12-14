const express = require("express");
const { followUser, unfollowUser, getProfile, listUsers } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/follow/:userId", auth, followUser);
router.post("/unfollow/:userId", auth, unfollowUser);
router.get("/profile/:userId", auth, getProfile);
router.get("/me", auth, getProfile); // current logged-in user
router.get("/list", auth, listUsers);
module.exports = router;
