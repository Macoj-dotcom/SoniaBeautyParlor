const protect = require("../middleware/authMiddleware");

router.get(
"/my-bookings",
protect,
async(req, res) => {

    const bookings = await 
    Booking.find({
        client:req.user._id
    });
    res.json(bookings);
});