const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Staff name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email name is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        specialization: {
            type: String,
            required: [true, "Specialization is required"],
            enum: ["Hair Styling", "Hair Cutting", "Hair Coloring", "Braiding", "Makeup", "Pedicure", "Manicure", "Facial"],
        },
        profileImage: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        experience: {
            type: Number,
            default: 0,
        },
        workingDays: [
            {
                type: String,
                enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            },
        ],
        availableSlots: [
            {
                type: String,
            },
        ],
        isAvailable: {
            type: Boolean,
            default: true,
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
            },        
        ],
        ratings: {
            type: Number,
            default: 0,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("staff", staffSchema);