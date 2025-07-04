const express = require('express');
const ConnectionDB = require('./connenction');
// const { applyMiddleware, checkAuth, restricedToLoggedInUserOnly } = require("./middleware/index");
const { applyMiddleware, restrictTo, checkForAuthenTication } = require("./middleware/index")
const cors = require('cors');
const path = require("path");
require("dotenv").config();

const urlRouter = require("./routes/url");
const userRouter = require("./routes/user")

const app = express();
const port = process.env.PORT || 3001;

  const allowedOrigins = [
    "https://url-weaver-1.onrender.com",  // Your frontend domain
    "https://url-weaver.onrender.com",    // Your backend domain (if needed)
    "http://localhost:3000",              // Local development
    "http://localhost:5173"               // Vite dev server
  ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Use the middleware array
app.use(applyMiddleware);

ConnectionDB();

app.use(express.static(path.join(__dirname, "dist")));

// Routes - Apply checkAuth to all routes to set req.user if authenticated
// app.use(checkAuth);
app.use(checkForAuthenTication);

// User routes (login, signup, history)
app.use("/api", userRouter);

// URL routes (protected)
app.use("/api", urlRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port} check : http://localhost:3001/`);
});