import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiHome, FiPlusSquare, FiUsers, FiLogOut, FiUser } from "react-icons/fi"; // icons [web:276]

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          InstaClone
        </Link>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/" className="nav-link-icon">
              <FiHome />
            </Link>
            <Link to="/users" className="nav-link-icon">
              <FiUsers />
            </Link>
            <Link to="/create" className="nav-link-icon">
              <FiPlusSquare />
            </Link>
            <Link to={`/profile/${user.id}`} className="nav-link-icon">
              <FiUser />
            </Link>
            <button className="nav-btn" onClick={handleLogout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-text-link">
              Login
            </Link>
            <Link to="/signup" className="nav-text-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
