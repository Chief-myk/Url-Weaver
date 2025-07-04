// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken")
const secret = "Mayank123@"


// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id); // Make sure to return the user
// }

function setUser(user) {
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role,
    }, secret)

}

function getUser(token) {
    if (!token) {
        return null
    }
    try {
        return jwt.verify(token , secret)
        
    } catch (error) {
        console.log('Sorry Something Went Wrong While getting User' , error);
        return null       
    }
}

module.exports = {
    setUser,
    getUser
};