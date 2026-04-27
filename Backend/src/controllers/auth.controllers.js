const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    try {
        const {
            username,
            email,
            password,
            role = "user"
        } = req.body || {};

        const trimmedUsername = username && username.trim();
        const trimmedEmail = email && email.trim().toLowerCase();

        if (!trimmedUsername || !trimmedEmail || !password) {
            return res.status(400).json({ message: "Username, email and password are required" });
        }

        const isUserAlreadyExist = await userModel.findOne({
            $or: [{ username: trimmedUsername }, { email: trimmedEmail }]
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username: trimmedUsername,
            email: trimmedEmail,
            password: hash,
            role
        });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // ✅ added expiry
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function loginUser(req,res){
    try {
        const { username, email, password } = req.body || {};
        const trimmedUsername = username && username.trim();
        const trimmedEmail = email && email.trim().toLowerCase();

        if ((!trimmedUsername && !trimmedEmail) || !password) {
            return res.status(400).json({ message: "Username or email and password are required" });
        }

        const user = await userModel.findOne(
            trimmedEmail
                ? { email: trimmedEmail }
                : { username: trimmedUsername }
        );

        if(!user){
            return res.status(401).json({message:"Invalid Credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token=jwt.sign({
            id:user._id,
            role:user.role
        },process.env.JWT_SECRET,{ expiresIn: "7d" });

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
        });

        res.status(200).json({
            message:"Login successful",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports = { registerUser ,loginUser};
