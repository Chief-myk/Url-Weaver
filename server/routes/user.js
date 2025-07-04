const express = require("express");
const { handleSignUp, handleLogin } = require("../controllers/user");
const { restrictTo } = require("../middleware/index");
const url = require("../models/index");

const  router = express.Router();

router.get("/admin/urls",restrictTo(["ADMIN"]) , async function (req,res) {
       const allurls = await url.find({});
        res.json({
            urls : allurls,
            createdBy : req.user?._id,
        })
})

// Public routes
router.post('/signup', handleSignUp);
router.post('/login', handleLogin);

// Protected routes
router.get('/history', restrictTo(["NORMAL" , "ADMIN"]) , async (req, res) => {
    try {
        const urls = await url.find({ createdBy: req.user._id });
        res.json(urls);
    } catch (error) {
        console.error("History fetch error:", error);
        res.status(500).json({ message: "Error fetching history" });
    }
});

// Add a route to check authentication status
router.get('/auth-status', (req, res) => {
    if (req.user) {
        res.json({ 
            authenticated: true, 
            user: { 
                id: req.user._id, 
                name: req.user.name, 
                email: req.user.email 
            } 
        });
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router;