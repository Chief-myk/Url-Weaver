const express = require("express")
const {
  handleShortUrl,
  handleRedirectUrl,
  handleAnalytics
} = require("../controllers/url")

const router = express.Router()


router.get('/analytics/:shortId', handleAnalytics)  
router.post('/', handleShortUrl)                    
router.get('/r/:shortId', handleRedirectUrl)       

module.exports = router