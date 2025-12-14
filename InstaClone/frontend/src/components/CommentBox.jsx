import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const CommentBox = ({ postId }) => {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data);
    } catch (err) {
      console.error("Load comments error", err);
    }
  };

  useEffect(() => {
    if (token) {
      loadComments();
    }
  }, [postId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await api.post(
        `/comments/${postId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      loadComments();
    } catch (err) {
      console.error("Add comment error", err);
    }
  };

  if (!token) return null;

  return (
    <div className="comments-wrapper">
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          className="comment-input"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="comment-post-btn">
          Post
        </button>
      </form>
      <div className="comments-list">
        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <strong className="comment-author">
              {c.author?.username}
            </strong>
            <span className="comment-text">{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
