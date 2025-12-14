const User = require("../models/User");

// Follow a user
const followUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(targetUserId)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "User followed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Follow failed" });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId.toString()
    );

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unfollow failed" });
  }
};

// Get profile (with follower / following count)
const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "username")
      .populate("following", "username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      followersCount: user.followers.length,
      followingCount: user.following.length,
      followers: user.followers,
      following: user.following,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// Get list of users (for search/list)
const listUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("username email")
      .limit(50);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { followUser, unfollowUser, getProfile, listUsers };
