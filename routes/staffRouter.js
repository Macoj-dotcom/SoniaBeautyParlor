const express = require("express");
const router = express.Router();

const {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
} = require("../controllers/staffController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
//Public route option
router.get("/", getAllStaff);
//protected routes
router.get("/:id", authMiddleware, getStaffById);
//Admin only routes
router.post("/", authMiddleware, roleMiddleware("admin"), createStaff);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateStaff);
router.delete("/", authMiddleware, roleMiddleware("admin"), deleteStaff);

module.exports = router;