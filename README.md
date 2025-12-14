INSTAGRAM MINI CLONE – TRUEiGTECH Task
This project was implemented as Task 1 – Instagram Mini Clone for TRUEiGTECH.
It is a mini social media web app (Instagram-style) built using the MERN stack, with a focus on backend APIs, database design, authentication, and clean code structure.​

1. Project Overview
Users can:

Sign up and log in with JWT-based authentication

View a feed of posts from people they follow

Create posts (image URL + caption)

Like / Unlike posts

Comment on posts

Follow / Unfollow other users

View profile with posts, followers, and following counts​

The project consists of:

Backend – Node.js, Express, MongoDB (Mongoose)

Frontend – React SPA consuming the REST API

Postman Collection – For quickly testing all endpoints​

2. Tech Stack
Backend
Node.js + Express

MongoDB + Mongoose (ODM)

JSON Web Tokens (JWT) for authentication

bcrypt for password hashing

dotenv for environment configuration

cors, morgan and other common middlewares​

Frontend
React (Create React App)

React Router

Axios for API calls

React Context (AuthContext) for auth state

Custom CSS for modern Instagram-like UI​

3. Folder Structure
text
INSTAGRAM_MINI_CLONE/
  ├── backend/
  │   ├── src/
  │   │   ├── config/
  │   │   │   └── db.js
  │   │   ├── middleware/
  │   │   │   └── authMiddleware.js
  │   │   ├── models/
  │   │   │   ├── User.js
  │   │   │   ├── Post.js
  │   │   │   └── Comment.js
  │   │   ├── routes/
  │   │   │   ├── authRoutes.js
  │   │   │   ├── userRoutes.js
  │   │   │   ├── postRoutes.js
  │   │   │   ├── likeRoutes.js
  │   │   │   └── commentRoutes.js
  │   │   └── server.js
  │   ├── package.json
  │   └── .env.example
  │
  ├── frontend/
  │   ├── src/
  │   │   ├── api/
  │   │   │   └── api.js
  │   │   ├── components/
  │   │   │   ├── Navbar.jsx
  │   │   │   ├── PostCard.jsx
  │   │   │   ├── CommentBox.jsx
  │   │   │   └── ProtectedRoute.jsx
  │   │   ├── pages/
  │   │   │   ├── Login.jsx
  │   │   │   ├── Signup.jsx
  │   │   │   ├── Feed.jsx
  │   │   │   ├── CreatePost.jsx
  │   │   │   ├── Profile.jsx
  │   │   │   ├── Users.jsx
  │   │   │   └── PostDetail.jsx
  │   │   ├── context/
  │   │   │   └── AuthContext.jsx
  │   │   ├── styles/
  │   │   │   └── main.css
  │   │   ├── App.jsx
  │   │   └── index.jsx
  │   └── package.json
  │
  ├── postman/
  │   └── InstaClone.postman_collection.json
  │
  └── README.md
Database design (schemas): backend/src/models/User.js, Post.js, Comment.js

API design (routes): backend/src/routes/*.js​

4. Database Design (Schema)
4.1 User Schema
Key fields:

username – unique

email – unique

password – hashed using bcrypt

followers – array of user references

following – array of user references

createdAt, updatedAt

Relationships:

Many-to-many: users follow each other via followers and following arrays.​

4.2 Post Schema
Key fields:

author – reference to User

image – image URL (string)

caption – text (string)

likes – array of user references

createdAt, updatedAt

Relationships:

One-to-many: one user can create many posts.

Many-to-many: users can like many posts, and posts can be liked by many users.​

4.3 Comment Schema
Key fields:

post – reference to Post

author – reference to User

text – comment text

createdAt, updatedAt

Relationships:

One-to-many: one post can have many comments.

5. API Design (Main Endpoints)
All backend routes are prefixed with /api.
Development base URL: http://localhost:5000/api.

Auth
POST /api/auth/signup – Register new user

POST /api/auth/login – Log in and receive JWT token

Users
GET /api/users/me – Get current logged-in user

GET /api/users/profile/:userId – Public profile of any user

GET /api/users/list – List all users

POST /api/users/follow/:userId – Follow a user

POST /api/users/unfollow/:userId – Unfollow a user

Posts
POST /api/posts – Create a post (protected)

GET /api/posts – Get all posts

GET /api/posts/feed – Feed of followed users (protected)

GET /api/posts/:postId – Single post detail

DELETE /api/posts/:postId – Delete own post (optional)

Likes
POST /api/likes/:postId/like – Like a post

POST /api/likes/:postId/unlike – Unlike a post

Comments
POST /api/comments/:postId – Add comment to post

GET /api/comments/:postId – Get comments for a post

All modifying endpoints require Authorization: Bearer <token> header.​

6. Authentication Flow
User registers via POST /api/auth/signup, password is hashed with bcrypt before saving.

On POST /api/auth/login, server returns a signed JWT containing the user ID.

Frontend stores token in local storage and attaches it as Authorization: Bearer <token> for protected APIs.

authMiddleware verifies the token and attaches req.user for posts, likes, comments, follow/unfollow routes.​

7. Features Implemented
Backend Features
User signup & login with hashed passwords and JWT tokens

Authentication middleware for private routes

Follow / Unfollow system maintaining followers and following relationships

Create posts with image URL and caption

Like / Unlike posts (per-user like, no duplicates)

Comment on posts and fetch comments with author info

Feed API showing posts from followed users only

Profile API giving user info plus followers, following, and posts count​

Frontend Features
Login & Signup pages storing token and user data in local storage

Protected area implemented using AuthContext and a ProtectedRoute component

Home Feed listing posts (image, caption, likes, “View comments”) from followed users

Create Post page (image URL + caption form)

Profile page showing username, email, followers/following counts, and user posts

Users page listing all users with Follow / Following state

Post Detail page with full post and interactive comments UI

Clean, responsive, Instagram-style UI with modern navbar and like button icons​

8. How to Run the Project
8.1 Prerequisites
Node.js and npm

MongoDB (local instance or cloud URI)

Git

8.2 Backend Setup
Navigate to backend folder:

bash
cd backend
Create environment file from example:

bash
cp .env.example .env
Open .env and fill values:

text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/instaclone
JWT_SECRET=your_jwt_secret_here
Install dependencies and start server:

bash
npm install
npm run dev    # or: npm start
Backend will run at http://localhost:5000 with base path /api.​

8.3 Frontend Setup
Navigate to frontend folder:

bash
cd frontend
Install dependencies and start React app:

bash
npm install
npm start
Frontend will run at http://localhost:3000 and is configured to call the backend at http://localhost:5000/api.​

9. Postman Collection (API Testing)
A ready Postman collection is provided in:

text
postman/InstaClone.postman_collection.json
Usage:

Open Postman → Import → select the JSON file.

Use Signup and Login requests to obtain a JWT.

Set the token in headers (or an environment variable).

Test all API groups:

Auth: signup, login

Users: profile, follow, unfollow, list

Posts: create, list, feed, detail

Likes: like, unlike

Comments: add comment, list comments​

This satisfies the requirement of providing a Postman collection in Git.​

10. Code Quality & Structure
Clear separation of concerns in the backend (models, routes, middleware, config).​

Environment variables isolated in .env, with .env.example included for reference.

RESTful API design and consistent naming conventions.

Frontend organized by components, pages, context, api, and styles directories.​

11. Deliverables Mapping to Task
Database design (own schema): User, Post, Comment models in backend/src/models.

API design: documented endpoints in this README and implemented in backend/src/routes.

Node.js project with working endpoints: full backend in backend/ folder.

Postman collection in Git: postman/InstaClone.postman_collection.json.

Proper README: this document explains tech stack, setup, how to run, and implemented features.
