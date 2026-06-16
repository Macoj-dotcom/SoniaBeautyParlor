require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const authRouter = require("./routes/authRouter");
const bookingRoutes = require("./routes/bookingRouter");
const staffRoutes = require("./routes/staffRouter");
const serviceRoutes = require("./routes/serviceRouter");
const uploadRoutes = require("./routes/uploadRouter");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(helmet());
app.use(cookieParser());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

app.use("/api/auth", authRouter);
app.use("/api/bookings", bookingRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/",(req, res) => {
    res.json({ message: "Sonia Beauty Parlour API Running" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
module.exports = app;
