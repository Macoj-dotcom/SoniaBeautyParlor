const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

//only Admin
router.get("/admin-dashboard", authMiddleware, roleMiddleware("admin"), adminDashboard);

//Admin and staff
router.get("/services", authMiddleware, roleMiddleware("admin", "staff"), getServices);

//All autheticated users
router.get("/profile", authMiddleware, profilecontroller);