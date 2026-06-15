const User = require ("../models/UserModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/GenerateToken");
const jwt = require("jsonwebtoken");
//Register
exports.register = async (req, res) => {
    try{
        const { name, email, password, phone, role } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.genSalt ? await bcrypt.hash(password, salt): password;
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || "user"
        });
        await newUser.save();
        res.status(201).json({ message:"User registered successfully"});
    } catch (error) {
        console.error("Registered Error:", error);
        res.status(500).json({message: "Server error"});
    }    
};
//login
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(400).json({message: "invalid credentials"});
        }
        //Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        );
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error("Login Error", error);
        res.status(500).json({message: "Server error"});
    }
};
//Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Get Profile Error", error);
        res.status(500).json({ message: "Servsr error"});
    }
};

/***Forgot Password */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const User = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No user found with that email"});
        }

        const resetToken = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"},
        );
        res.status(200).json({
            message: "Password reset token generated successfully",
            token: resetToken 
        });
    } catch (error) {
        console.error("Forgot Password Error:", error)
        res.status(500).json({ message: "Server error"});
    }
};
/**Reset Password */
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        //verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({message: "User not found "});
        }
        //hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save(),
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("ResetPassword Error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Token expired, request a new link" });
        }
        res.status(400).json({ message: "Invalid token structure" });
    }
};
// verify email
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params
        //verify confirmation token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id);
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }
        //Assuming you have an 'isverified' field in your schema
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: "Email verification successful" });
    } catch (error) {
        console.error("Verify Email Error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Verification link expired" });
        }
        res.status(400).json({ message: "Invalid verification link" });
    }
};