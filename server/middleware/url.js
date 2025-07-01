const express = require("express")

function middleware() {
    return [
        express.json({ extended: false })
    ];
}

module.exports = middleware
