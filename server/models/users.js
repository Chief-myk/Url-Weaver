// models/user.js
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type : String,
        required : true,
        default : "NORMAL" 
    }
}, { timestamps: true })

const myUsers = mongoose.models.myUsers || mongoose.model("myUsers", userSchema)
module.exports = myUsers