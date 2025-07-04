const express = require("express")
const {
  handleShortUrl,
  handleRedirectUrl,
  handleAnalytics
} = require("../controllers/url")
// const { restricedToLoggedInUserOnly } = require("../middleware/index");
const { restrictTo } = require("../middleware/index");

const router = express.Router()

// Public routes (no authentication required)
router.get('/r/:shortId', handleRedirectUrl)    
router.get('/analytics/:shortId', handleAnalytics)  

// Protected routes (authentication required)
// router.post('/', restricedToLoggedInUserOnly, handleShortUrl)                    
router.post('/', restrictTo(["NORMAL" , "ADMIN"]), handleShortUrl)                    

module.exports = router