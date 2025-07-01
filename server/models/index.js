const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        // unique: true
    },
    RedirectUrl: {
        type: String,
        // unique: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number
            }
        }
    ]
}, { timestamps: true })

const url = mongoose.model("url", urlSchema)

module.exports = url