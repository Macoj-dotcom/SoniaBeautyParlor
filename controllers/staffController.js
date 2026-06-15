const Staff = require("../models/StaffModel");

const Booking = require("../models/BookingModel");
const createStaff = async (req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({message: "error message"});
    }
};
const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (error) {
        res.status(500).json({message: "error.message"});
    }
};
const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);

        if (!staff) {
            return res.status(404).json({message: "Staff not found"});
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({message: "error.message"});
    }
};
const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(staff);
    } catch (error) {
        res.status(500).json({message: "error.message"});
    }
};
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.json({ message: "Staff deleted" });
    } catch (error) {
        res.status(500).json({message: "error.message"});
    }
};
const staffDashboard = async (req, res)=> {
    try {
        const bookings = await Booking.find()
        .populate("client", "name email")
        .sort({createdAt: -1});
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "error.message" });
    }
};

module.exports = {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    staffDashboard
};
