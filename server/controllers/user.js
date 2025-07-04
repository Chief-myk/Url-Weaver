// controllers/user.js
const User = require("../models/users");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/Auth");

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = await User.create({ name, email, password });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const token = setUser(user);
        res.cookie("uid", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        return res.status(200).json({
            message: "Login successful",
            userId: user._id,
            name: user.name
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    handleSignUp,
    handleLogin
};