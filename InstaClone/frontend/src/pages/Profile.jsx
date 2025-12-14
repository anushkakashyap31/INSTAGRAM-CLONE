import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { id } = useParams(); // /profile/:id
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const isMe = !id || id === user?.id;

  // Load profile info
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        const userId = id || user.id;
        const res = await api.get(`/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);

        if (!isMe && res.data.followers) {
          const exists = res.data.followers.some(
            (u) => u._id === user.id
          );
          setFollowing(exists);
        }
      } catch (err) {
        console.error("Profile load error", err);
      }
    };

    loadProfile();
  }, [id, token, user, isMe]);

  // Load user's posts
  useEffect(() => {
    const loadPosts = async () => {
      if (!token) return;
      try {
        const userId = id || user.id;
        const res = await api.get("/posts", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const filtered = res.data.filter(
          (p) => p.author && p.author._id === userId
        );
        setPosts(filtered);
      } catch (err) {
        console.error("User posts load error", err);
      }
    };

    loadPosts();
  }, [id, token, user]);

  const handleFollowToggle = async () => {
    if (!profile) return;
    setLoadingFollow(true);
    try {
      const url = following
        ? `/users/unfollow/${profile.id}`
        : `/users/follow/${profile.id}`;
      await api.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFollowing(!following);
    } catch (err) {
      console.error("Follow/unfollow error", err);
    } finally {
      setLoadingFollow(false);
    }
  };

  if (!token) {
    return <p>Please login to view profiles.</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700
          }}
        >
          {profile.username[0].toUpperCase()}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{profile.username}</h2>
          <p style={{ margin: "4px 0" }}>{profile.email}</p>
          <p style={{ margin: "4px 0" }}>
            <strong>{posts.length}</strong> posts ·{" "}
            <strong>{profile.followersCount}</strong> followers ·{" "}
            <strong>{profile.followingCount}</strong> following
          </p>
          {!isMe && (
            <button onClick={handleFollowToggle} disabled={loadingFollow}>
              {following ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      <h3>Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Profile;
