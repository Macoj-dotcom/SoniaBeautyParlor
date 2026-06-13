const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL.PASS
    },
});
const sendAppointmentMail = async (email, booking) => {
    await transporter.sendMail({
        from: process.env.EMAIl_USER,
        to: email,
        subject: "Appointment Confirmation - Sonia Beauty Parlour",
        html: `
        <h2>Sonia Beauty Parlour</h2>
        <p>Appointment booked successfully.</p>
        <p>
        service: ${booking.service}
        </p>
        <p>
            Date: ${booking.date}
        </p>
        `,
    });
};
module.exports = {
    sendAppointmentMail,
};