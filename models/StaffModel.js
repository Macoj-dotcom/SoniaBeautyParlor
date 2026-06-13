const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
    name:String,
    specialization:String,
    workingdays:[String],
    availableSlots: [String]
});

module.exports = mongoose.model("staff", staffSchema);