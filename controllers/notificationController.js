const {
    sendAppointmentMail
} = require("../services/emailService");

const sendConfirmation = async (
    email,
    booking 
) => {
    await sendAppointmentMail(
        email,
        booking
    );
};
module.exports = {
    sendConfirmation
}