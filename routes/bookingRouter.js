const express = require("express");
const router = express.Router();

const {
    createBooking,
    getMyBookings,
    cancelBooking,
    getAllBookings 
} = require ("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const roleMiddleware =require("../middleware/authMiddleware/roleMiddleware");


router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.put(
    "/cancel/:id",
    protect,
    cancelBooking
);
router.get(
    "/all",
    protect,
    roleMiddleware(["admin", "staff"]),
    getAllBookings
);
module.exports = router;