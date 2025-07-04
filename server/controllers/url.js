const { nanoid } = require("nanoid")
const url = require("../models/index")

async function handleShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ ERROR: "Missing url" });
    
    // Check if user is authenticated (middleware should ensure this)
    if (!req.user) {
        return res.status(401).json({ ERROR: "Unauthorized" });
    }

    const shortID = nanoid(5);
    
    try {
        await url.create({
            shortId: shortID,
            RedirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user._id
        });
        return res.json({ shortId: shortID });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ ERROR: "Internal server error" });
    }
}

async function handleRedirectUrl(req, res) {
    const shortID = req.params.shortId;
    
    try {
        const entry = await url.findOneAndUpdate({
            shortId: shortID
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });
        
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        res.redirect(entry.RedirectUrl);
    } catch (error) {
        console.error("Redirect error:", error);
        return res.status(500).send("Internal server error");
    }
}

async function handleAnalytics(req, res) {
    const shortID = req.params.shortId;
    
    try {
        const result = await url.findOne({
            shortId: shortID
        });
        
        if (!result) {
            return res.status(404).json({ ERROR: "Short URL not found" });
        }
        
        return res.json({
            "Total Clicks": result.visitHistory.length,
            analytics: result.visitHistory
        });
    } catch (error) {
        console.error("Analytics error:", error);
        return res.status(500).json({ ERROR: "Internal server error" });
    }
}

module.exports = {
    handleShortUrl,
    handleRedirectUrl,
    handleAnalytics
}