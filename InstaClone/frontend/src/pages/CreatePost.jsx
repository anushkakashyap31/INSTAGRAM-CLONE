import React, { useContext, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ image: "", caption: "" });

  if (!token) {
    return <p>Please login to create a post.</p>;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Post created");
      setForm({ image: "", caption: "" });
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <input
          name="caption"
          placeholder="Caption"
          value={form.caption}
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
