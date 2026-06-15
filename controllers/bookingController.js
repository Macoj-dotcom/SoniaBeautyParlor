const Booking = require("../models/BookingModel");
const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({
            client: req.user._id,
            service: req.body.service,
            date: req.body.date
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({message: "error.message"});
    }
};
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({client: req.user._id}).sort({date: 1});
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _d: req.params.id,
            client:req.user._id
        });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.status = "cancelled";
        await booking.save();
        res.json({ message: "Booking cancelled" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }      
};
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        .populate("client", "name email");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking,
    getAllBookings
};