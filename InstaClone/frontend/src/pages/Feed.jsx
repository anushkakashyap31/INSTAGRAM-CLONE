import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";

const Feed = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadFeed = async () => {
      if (!token) return;
      try {
        const res = await api.get("/posts/feed", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadFeed();
  }, [token]);

  if (!token) {
    return (
      <div style={{ marginTop: 40, textAlign: "center" }}>
        Please login to see your feed.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Feed</h2>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#8e8e8e" }}>
          No posts yet. Follow users and create posts to see them here.
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onUpdate={(updated) =>
              setPosts((prev) =>
                prev.map((p) => (p._id === updated._id ? updated : p))
              )
            }
          />
        ))
      )}
    </div>
  );
};

export default Feed;
