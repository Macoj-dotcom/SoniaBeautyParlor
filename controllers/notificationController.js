const {sendAppointmentMail} = require("../services/emailService");

const sendConfirmation = async (req, res) => {
    try {
        const { email, booking } = req.body;
        if (!email || !booking) {
            return res.status(400).json({ message: "Email and booking details are required"});
        } 
        await sendAppointmentMail(email, booking);
        return res.status(200).json({ message: "Confirmation email sent successfully!"});   
    } catch (error) {
        console.error("Email Controller Error:", error);
        return res.status(500).json({ message: error.message || "Failed to send email" });
    }
    
};
module.exports = { sendConfirmation };