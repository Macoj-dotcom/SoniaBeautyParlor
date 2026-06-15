const express = require("express");
const router = express.router();
const Booking = require("../models/BookingModel");
const protect = require("../middleware/authMiddleware");

router.get(
    "/my-bookings",
    protect,
    async(req, res) => {
        try {
                const bookings = await Booking.find({ customer: req.user._id });
        
            res.json(bookings);
        } catch (error) {
            console.error("Get Secure Bookings Error:", error);
            res.status(500).json({ message: "Server error"});
        }    
    }
);
module.exports = router;    