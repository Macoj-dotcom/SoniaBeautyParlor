const User = require("../models/userModel");
const Booking = require("../models/BookingModel");
const { success } = require("zod");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({user});
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ message: error.message || "Server error"})
    }
};
//Get update profile
const updateProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        user.name = name || user.name;
        user.phone = phone ||user.phone;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated",
            user,
        });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: error.message });
    }
};
//get all bookings of logged-in user
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ customer: req.user.id })
        .populate("staff", "name")
        .populate("service", "name price");

        res.status(200).json({
            success: true,
            count: bookings.length, bookings,
        });
    } catch (error){
        console.error("Get My Booking Error:", error);
        res.status(500).json({ message: error.message || "Server error"});
    }
};
//Delete user Account
const deleteAccount = async  (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete (req.user.id);
        res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error(" Delete Account Error:", error);
        res.status(500).json({ message: error.message || "Server error"});
    }
};
module.exports = {
    getProfile,
    updateProfile,
    getMyBookings,
    deleteAccount,
};