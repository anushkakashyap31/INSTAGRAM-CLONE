# InstaClone Backend

## Overview
This is the backend for the Instagram Mini Clone. It provides REST APIs for authentication, follow system, posts, likes, comments, and feed using Node.js, Express, MongoDB, Mongoose, JWT, and bcryptjs.

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- JSON Web Token (JWT) for auth
- bcryptjs for password hashing
- dotenv, cors

## Features
- User signup & login with hashed passwords
- JWT-based authentication and protected routes
- Follow / Unfollow other users
- Create posts with image URL and caption
- Like / Unlike posts
- Comment on posts and fetch comments with author info
- Feed API: posts from followed users only
- Profile API: followers/following count and basic user info
- Users list API: lightweight list for follow UI

## Project Structure
- `src/config` – database and env config  
- `src/models` – User, Post, Comment schemas  
- `src/controllers` – auth, user, post, like, comment logic  
- `src/routes` – route definitions for all modules  
- `src/middleware` – auth middleware (JWT)  
- `src/utils` – token helper

## Environment Variables
Create `.env` in `backend/`:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/instaclone
JWT_SECRET=your_secret_here

text

## How to Run

cd backend
npm install
npm run dev # or npm start


Server runs on `http://localhost:5000`.