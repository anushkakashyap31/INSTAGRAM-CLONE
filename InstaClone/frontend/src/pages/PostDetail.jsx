import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import CommentBox from "../components/CommentBox";

const PostDetail = () => {
  const { id } = useParams(); // /post/:id
  const { token } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!token) return;
      try {
        const res = await api.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPost(res.data);
      } catch (err) {
        console.error("Post detail load error", err);
      }
    };

    loadPost();
  }, [id, token]);

  if (!token) {
    return <p>Please login to view posts.</p>;
  }

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div className="card">
        <div className="card-header">
          <span>{post.author?.username}</span>
        </div>
        <img src={post.image} alt="post" className="card-image" />
        <div className="card-body">
          <p>{post.caption}</p>
          <p>Likes: {post.likes?.length || 0}</p>
        </div>
      </div>

      <CommentBox postId={post._id} />
    </div>
  );
};

export default PostDetail;
