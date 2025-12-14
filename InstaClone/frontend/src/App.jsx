import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import Navbar from "./components/Navbar";
import "./styles/main.css";
import Users from "./pages/Users";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Feed />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
