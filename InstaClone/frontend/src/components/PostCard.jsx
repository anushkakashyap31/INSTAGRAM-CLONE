import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // heart icons [web:276][web:277]

const PostCard = ({ post, onUpdate }) => {
  const { token, user } = useContext(AuthContext);
  const [loadingLike, setLoadingLike] = useState(false);
  const navigate = useNavigate();

  const hasLiked = post.likes?.some(
    (u) => u === user?.id || u?._id === user?.id
  );

  const toggleLike = async () => {
    if (!token) return;
    setLoadingLike(true);
    try {
      const url = hasLiked
        ? `/likes/${post._id}/unlike`
        : `/likes/${post._id}/like`;

      await api.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onUpdate) {
        const newLikes = hasLiked
          ? (post.likes || []).filter(
              (u) => (u._id || u).toString() !== user.id.toString()
            )
          : [...(post.likes || []), user.id];

        onUpdate({
          ...post,
          likes: newLikes
        });
      }
    } catch (err) {
      console.error("Like error", err);
    } finally {
      setLoadingLike(false);
    }
  };

  const goToDetail = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="card">
      <div className="card-header" onClick={goToDetail}>
        <span className="card-username">{post.author?.username}</span>
      </div>

      <img
        src={post.image}
        alt="post"
        className="card-image"
        onClick={goToDetail}
      />

      <div className="card-body">
        <p className="card-caption">{post.caption}</p>

        <div className="card-actions">
          <button
            className={`like-btn ${hasLiked ? "liked" : ""}`}
            onClick={toggleLike}
            disabled={loadingLike || !token}
          >
            {hasLiked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <span className="likes-count">
            {post.likes?.length || 0} likes
          </span>
        </div>

        <button className="view-comments-btn" onClick={goToDetail}>
          View comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;
