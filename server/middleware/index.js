// middleware.index.js

const express = require("express");
const { getUser } = require("../service/Auth");
const cookieParser = require("cookie-parser");

const applyMiddleware = [
    express.json({ extended: false }),
    cookieParser()
];

function checkForAuthenTication(req, res ,next) {
    const tokencookie = req.cookies?.uid;   
    req.user = null
    if (!tokencookie) {
        return next();
    }
    // FIXED: Removed Bearer token check since we're using cookies, not Authorization header
    // if (!AuthHeader || !AuthHeader.startsWith("Bearer")) {
    //     return next();
    // }
    // const token = AuthHeader.split("Bearer ")[1];
    const user = getUser(tokencookie);
    req.user = user
    next()
}


function restrictTo(role = []) {
    return function(req , res , next) {
        if (!req.user) {
             return res.redirect("/login");
        }
        if (!role.includes(req.user.role)) {
            return res.end("Unauthorized")
        }
        next()
        
    }
    
}

// function restricedToLoggedInUserOnly(req, res, next) {
//     const userUId = req.cookies?.uid;
//     //  const authHeader = req.headers["authorization"];
//     if (!userUId) {
//         return res.redirect("/login");
//     }
//     //  const token = authHeader.split("Bearer ")[1];
//     // const user = getUser(token);

//     const user = getUser(userUId);
//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }

// function checkAuth(req, res, next) {
//     const userUId = req.cookies?.uid;
//     //  const authHeader = req.headers["authorization"];
//     //  const token = authHeader.split("Bearer ")[1];
//     // const user = getUser(token);

//     if (!userUId) {
//         return next();
//     }

//     const user = getUser(userUId);
//     if (user) {
//         req.user = user;
//     }

//     next();
// }

module.exports = {
    applyMiddleware,
    // restricedToLoggedInUserOnly,
    // checkAuth,
    checkForAuthenTication,
    restrictTo
};