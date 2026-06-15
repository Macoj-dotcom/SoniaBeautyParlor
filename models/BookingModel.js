const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "clients",
            required: true,
        },
        service: {
            type: String,
            required: [true, "Service is required"],
            trim: true
        },
        staff: {
            type: mongoose.Schema.ObjectId,
            ref: "Staff",
            default: null,
        },
        date: {
            type: Date,
            required: [true, "Appointment date is required"],
        },
        duration: {
            type: Number,
            default: 60, // minutes
        },
        price: {
            type: Number,
            default: 0,
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },
        status:{
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        paymentIntentId: {
            type: String,
            default: "",
        },
        reminderSent: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/***Prevent double booking */
bookingSchema.index({date: 1, staff: 1}, {unique: true});

module.exports = mongoose.model("Booking", bookingSchema);