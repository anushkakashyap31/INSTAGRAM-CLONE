# InstaClone Frontend

## Overview
This is the React frontend for the Instagram Mini Clone. It consumes the backend APIs to provide login/signup, feed, create post, profile, users list, and post detail screens.

## Tech Stack
- React (CRA)
- React Router DOM
- Axios

## Features
- Login & Signup pages with JWT stored in localStorage
- AuthContext for global auth state and protected behavior
- Home Feed:
  - Fetches `/api/posts/feed`
  - Shows image, caption, like count
  - Like / Unlike button
- Create Post page:
  - Form for image URL + caption
  - Calls `/api/posts`
- Users page:
  - Fetches `/api/users/list`
  - Follow button to follow other users
- Profile page:
  - Fetches `/api/users/profile/:id`
  - Shows username, email
  - Followers / Following count
  - User’s posts list
  - Follow / Unfollow button on other users
- Post Detail page:
  - Fetches `/api/posts/:id`
  - Full post view
  - CommentBox to add & list comments from `/api/comments/:postId`
- Basic responsive, card-based UI using CSS

## Project Structure
- `src/api/api.js` – Axios instance
- `src/context/AuthContext.jsx` – auth state, login/logout helpers
- `src/components` – Navbar, PostCard, CommentBox, ProtectedRoute
- `src/pages` – Login, Signup, Feed, CreatePost, Profile, PostDetail, Users
- `src/styles/main.css` – global styles

## How to Run

cd frontend
npm install
npm start

The app runs on `http://localhost:3000` and expects backend on `http://localhost:5000/api`.