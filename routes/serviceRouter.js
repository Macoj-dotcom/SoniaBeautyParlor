const express = require("express");
const router = express.Router();

const {
    createService,
    getServices,
    getService,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", protect, roleMiddleware(["admin"]), createService);
module.exports = router;