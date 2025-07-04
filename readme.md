# 🌐 URL Weaver

URL Weaver is a full-stack URL shortener web application built using **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to register, log in, and shorten long URLs, while keeping track of their shortened URL history. The project was built as a portfolio-grade application to learn and demonstrate real-world development, authentication, and deployment practices.

---

## 🚀 Live Deployment

- **Frontend (Render):** [https://urlweaver-frontend.onrender.com](https://urlweaver-frontend.onrender.com)
- **Backend (Render):** [https://urlweaver-backend.onrender.com](https://urlweaver-backend.onrender.com)

---

## 📁 Tech Stack Used

### 💻 Frontend
- React.js
- Tailwind CSS (or basic CSS, depending on your stack)
- Axios for API calls

### 🌐 Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for Authentication
- Cookie-parser for session handling
- dotenv for environment variables
- Bcrypt for password hashing

---

## 🔐 Features

- ✅ User Registration and Login
- ✅ JWT Token-based Authentication
- ✅ Secure Cookie-based Session Storage
- ✅ URL Shortening with Unique IDs
- ✅ Track User’s Shortened URL History
- ✅ Protected Routes using Middleware
- ✅ Fully Responsive UI
- ✅ Persistent Database Storage using MongoDB
- ✅ Deployed on Render (Both frontend and backend)

---
- 

## 🔒 Authentication Flow
- On login/signup, a JWT token is created and sent to the frontend.

- The token is stored in cookies for session persistence.

- Protected routes use middleware to verify tokens via cookies or headers.

## 🧠 Things I Learned
- Setting up full-stack applications (MERN stack)

- JWT authentication and authorization

- Working with cookies and secure sessions

- Creating and validating Express middleware

- MongoDB and Mongoose schemas

- Handling deployment on Render (frontend and backend)

- Debugging CORS and cookie issues across domains

- Structuring scalable backend with routes, services, and models

## ⚠️ Challenges Faced
- CORS & Cookies: Cookies were not being sent across domains during login, especially on Render. Resolved by setting correct credentials and sameSite settings.

- JWT Token Verification: Middleware had issues accessing cookies or headers. Fixed by consistently using headers for token transfer.

- React + Express Integration: Serving frontend build and managing separate Render deployments for frontend and backend required proper environment variable setup and CORS configuration.

- MulterError: During file uploads, "Unexpected field" errors were faced and resolved by properly configuring Multer middleware.

- Unauthorized Access: 401 errors on /history and other protected routes, resolved using robust restrictedToLoggedInUserOnly() middleware.

## 📬 Contact
- Developer: Mayank Mittal
- Email: mayankmittal1106@gmail.com
- LinkedIn: [https://www.linkedin.com/in/mayankmittal1311/](https://www.linkedin.com/in/mayankmittal1311/)