const { nanoid } = require("nanoid")
const url = require("../models/index")

async function handleShortUrl(req, res) {
    const body = req.body
    if (!body) {
        return (
            res.status(400).json({ ERROR: "BAD REQUEST" })
        )
    }
    shortID = nanoid(5)
    await url.create({
        shortId: shortID,
        RedirectUrl: body.url,
        visitHistory: []

    })
    // return res.json({ "Your ID is": shortID })
    return res.json({ shortId: shortID });

}
async function handleRedirectUrl(req, res) {
    const shortID = req.params.shortId;
    const entry = await url.findOneAndUpdate({
        shortId: shortID
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    if (!entry) {
        return res.status(404).send("Short URL not found")
    }


    res.redirect(entry.RedirectUrl)
}

async function handleAnalytics(req, res) {
    const shortID = req.params.shortId;
    const result = await url.findOne({
        shortId : shortID
    })
    return  res.json({
        "Total Clicks" :  result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {
    handleShortUrl,
    handleRedirectUrl,
    handleAnalytics
}