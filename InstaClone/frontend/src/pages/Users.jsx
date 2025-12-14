import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const { token, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!token) return;
      try {
        const [usersRes, meRes] = await Promise.all([
          api.get("/users/list", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          api.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUsers(usersRes.data);
        const ids = meRes.data.following?.map((u) => u._id) || [];
        setFollowingIds(ids);
      } catch (err) {
        console.error("Users load error", err);
      }
    };

    loadUsers();
  }, [token]);

  const handleFollow = async (id) => {
    try {
      await api.post(
        `/users/follow/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFollowingIds((prev) => [...prev, id]);
      alert("Followed");
    } catch (err) {
      alert("Follow failed");
    }
  };

  if (!token) return <p>Please login to see users.</p>;

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Users</h2>
      {users.map((u) => {
        const isSelf = u._id === user?.id;
        const isFollowing = followingIds.includes(u._id);

        return (
          <div
            key={u._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 0",
              borderBottom: "1px solid #eee"
            }}
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => window.location.assign(`/profile/${u._id}`)}
            >
              <strong>{u.username}</strong> <span>({u.email})</span>
            </span>
            {!isSelf &&
              (isFollowing ? (
                <span style={{ color: "#8e8e8e", fontSize: 14 }}>
                  Following
                </span>
              ) : (
                <button onClick={() => handleFollow(u._id)}>Follow</button>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default Users;
