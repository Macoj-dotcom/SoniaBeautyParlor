const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Service name is required"],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Service description is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Service price is required"],
            min: [0, "Price cannot be negative"],
        },
        duration: {
            type: Number,
            required: [true, "Service duration is required"],
            default: 60,
            min: [30, "Duration must be atleast 30 minutes"],
        },
        category: {
            type: String,
            required: [true, "Service category is required"],
            enum: ["Hair Styling", "Hair Cutting", "Hair Coloring", "Braiding", "Makeup", "Pedicure", "Manicure", "Facial"],
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.models("Service", serviceSchema);