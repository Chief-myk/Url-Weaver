
const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
    },
    RedirectUrl: {
        type: String,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "myUsers"
    },
}, { timestamps: true })

const url = mongoose.models.url || mongoose.model("url", urlSchema)

module.exports = url
